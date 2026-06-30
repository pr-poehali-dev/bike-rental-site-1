import json
import os
import psycopg2
import psycopg2.extras

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
    'Access-Control-Max-Age': '86400',
}

# Конфигурация ресурсов: таблица, разрешённые поля, поле сортировки, публичный фильтр
RESOURCES = {
    'bikes': {
        'table': 'bikes',
        'fields': ['name', 'category', 'price', 'rating', 'speeds', 'weight', 'emoji', 'badge', 'is_active', 'sort_order'],
        'order': 'sort_order ASC, id ASC',
        'public_filter': 'is_active = TRUE',
    },
    'pricing': {
        'table': 'pricing_plans',
        'fields': ['name', 'price', 'unit', 'description', 'features', 'is_popular', 'sort_order'],
        'order': 'sort_order ASC, id ASC',
        'json_fields': ['features'],
    },
    'reviews': {
        'table': 'reviews',
        'fields': ['name', 'role', 'text', 'rating', 'is_published'],
        'order': 'id DESC',
        'public_filter': 'is_published = TRUE',
    },
    'locations': {
        'table': 'locations',
        'fields': ['name', 'address', 'bikes_count', 'pos_top', 'pos_left', 'sort_order'],
        'order': 'sort_order ASC, id ASC',
    },
    'partners': {
        'table': 'partners',
        'fields': ['name', 'icon', 'description', 'sort_order'],
        'order': 'sort_order ASC, id ASC',
    },
    'blog': {
        'table': 'blog_posts',
        'fields': ['title', 'tag', 'image', 'excerpt', 'read_time', 'is_published'],
        'order': 'id DESC',
        'public_filter': 'is_published = TRUE',
    },
    'faqs': {
        'table': 'faqs',
        'fields': ['question', 'answer', 'sort_order'],
        'order': 'sort_order ASC, id ASC',
    },
    'bookings': {
        'table': 'bookings',
        'fields': ['name', 'phone', 'bike', 'hours', 'booking_date', 'status'],
        'order': 'id DESC',
        'admin_read': True,
        'public_create': True,
    },
    'contacts': {
        'table': 'contact_messages',
        'fields': ['name', 'email', 'message', 'status'],
        'order': 'id DESC',
        'admin_read': True,
        'public_create': True,
    },
}


def _conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def _resp(status, body):
    return {
        'statusCode': status,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'isBase64Encoded': False,
        'body': json.dumps(body, default=str),
    }


def _user_by_token(cur, token):
    if not token:
        return None
    cur.execute(
        "SELECT u.id, u.role FROM sessions s JOIN users u ON u.id = s.user_id "
        "WHERE s.token = %s AND s.expires_at > NOW()",
        (token,),
    )
    row = cur.fetchone()
    return {'id': row[0], 'role': row[1]} if row else None


def handler(event: dict, context):
    '''Универсальный CRUD для контента сайта: каталог, цены, отзывы, локации, партнёры, блог, FAQ, заявки, обращения.'''
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'isBase64Encoded': False, 'body': ''}

    params = event.get('queryStringParameters') or {}
    resource = params.get('resource', '')
    if resource not in RESOURCES:
        return _resp(400, {'error': 'Unknown resource'})

    cfg = RESOURCES[resource]
    table = cfg['table']
    headers = event.get('headers') or {}
    token = headers.get('X-Auth-Token') or headers.get('x-auth-token')

    conn = _conn()
    conn.autocommit = True
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    try:
        user = _user_by_token(cur, token)
        is_editor = user and user['role'] in ('admin', 'editor')

        if method == 'GET':
            if cfg.get('admin_read') and not is_editor:
                return _resp(403, {'error': 'Доступ запрещён'})
            where = ''
            if not is_editor and cfg.get('public_filter'):
                where = f"WHERE {cfg['public_filter']}"
            cur.execute(f"SELECT * FROM {table} {where} ORDER BY {cfg['order']}")
            return _resp(200, {'items': cur.fetchall()})

        body = json.loads(event.get('body') or '{}')

        if method == 'POST':
            if not (is_editor or cfg.get('public_create')):
                return _resp(403, {'error': 'Доступ запрещён'})
            fields, values, placeholders = [], [], []
            for f in cfg['fields']:
                if f in body:
                    val = body[f]
                    if f in cfg.get('json_fields', []):
                        val = json.dumps(val, ensure_ascii=False)
                    fields.append(f)
                    values.append(val)
                    placeholders.append('%s')
            if not fields:
                return _resp(400, {'error': 'Нет данных'})
            cols = ', '.join(fields)
            ph = ', '.join(placeholders)
            cur.execute(f"INSERT INTO {table} ({cols}) VALUES ({ph}) RETURNING *", values)
            return _resp(200, {'item': cur.fetchone()})

        if method == 'PUT':
            if not is_editor:
                return _resp(403, {'error': 'Доступ запрещён'})
            item_id = body.get('id')
            if not item_id:
                return _resp(400, {'error': 'Не указан id'})
            sets, values = [], []
            for f in cfg['fields']:
                if f in body:
                    val = body[f]
                    if f in cfg.get('json_fields', []):
                        val = json.dumps(val, ensure_ascii=False)
                    sets.append(f"{f} = %s")
                    values.append(val)
            if not sets:
                return _resp(400, {'error': 'Нет данных'})
            values.append(item_id)
            cur.execute(f"UPDATE {table} SET {', '.join(sets)} WHERE id = %s RETURNING *", values)
            return _resp(200, {'item': cur.fetchone()})

        if method == 'DELETE':
            if not is_editor:
                return _resp(403, {'error': 'Доступ запрещён'})
            item_id = params.get('id') or body.get('id')
            if not item_id:
                return _resp(400, {'error': 'Не указан id'})
            cur.execute(f"DELETE FROM {table} WHERE id = %s", (int(item_id),))
            return _resp(200, {'success': True})

        return _resp(405, {'error': 'Method not allowed'})
    finally:
        cur.close()
        conn.close()
