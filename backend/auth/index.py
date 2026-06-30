import json
import os
import hashlib
import secrets
from datetime import datetime, timedelta
import psycopg2

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
    'Access-Control-Max-Age': '86400',
}


def _conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def _hash(pw: str) -> str:
    return hashlib.sha256(pw.encode()).hexdigest()


def _resp(status: int, body: dict):
    return {
        'statusCode': status,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'isBase64Encoded': False,
        'body': json.dumps(body, default=str),
    }


def handler(event: dict, context):
    '''Авторизация: регистрация, вход, проверка токена и список пользователей для админа.'''
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'isBase64Encoded': False, 'body': ''}

    params = event.get('queryStringParameters') or {}
    action = params.get('action', '')
    headers = event.get('headers') or {}
    token = headers.get('X-Auth-Token') or headers.get('x-auth-token')

    conn = _conn()
    conn.autocommit = True
    cur = conn.cursor()

    try:
        if method == 'POST':
            body = json.loads(event.get('body') or '{}')
            sub = body.get('action', action)

            if sub == 'register':
                name = (body.get('name') or '').strip()
                email = (body.get('email') or '').strip().lower()
                password = body.get('password') or ''
                if not name or not email or not password:
                    return _resp(400, {'error': 'Заполните все поля'})
                cur.execute("SELECT id FROM users WHERE email = %s", (email,))
                if cur.fetchone():
                    return _resp(409, {'error': 'Email уже зарегистрирован'})
                cur.execute(
                    "INSERT INTO users (name, email, password_hash, role) VALUES (%s, %s, %s, 'user') RETURNING id, name, email, role",
                    (name, email, _hash(password)),
                )
                row = cur.fetchone()
                user = {'id': row[0], 'name': row[1], 'email': row[2], 'role': row[3]}
                tok = _make_session(cur, user['id'])
                return _resp(200, {'token': tok, 'user': user})

            if sub == 'login':
                email = (body.get('email') or '').strip().lower()
                password = body.get('password') or ''
                cur.execute(
                    "SELECT id, name, email, role, password_hash FROM users WHERE email = %s",
                    (email,),
                )
                row = cur.fetchone()
                if not row or row[4] != _hash(password):
                    return _resp(401, {'error': 'Неверный email или пароль'})
                user = {'id': row[0], 'name': row[1], 'email': row[2], 'role': row[3]}
                tok = _make_session(cur, user['id'])
                return _resp(200, {'token': tok, 'user': user})

            return _resp(400, {'error': 'Неизвестное действие'})

        if method == 'GET' and action == 'me':
            user = _user_by_token(cur, token)
            if not user:
                return _resp(401, {'error': 'Не авторизован'})
            return _resp(200, {'user': user})

        if method == 'GET' and action == 'users':
            user = _user_by_token(cur, token)
            if not user or user['role'] != 'admin':
                return _resp(403, {'error': 'Доступ запрещён'})
            cur.execute("SELECT id, name, email, role, created_at FROM users ORDER BY id")
            users = [
                {'id': r[0], 'name': r[1], 'email': r[2], 'role': r[3], 'created_at': r[4]}
                for r in cur.fetchall()
            ]
            return _resp(200, {'items': users})

        if method == 'PUT' and action == 'users':
            user = _user_by_token(cur, token)
            if not user or user['role'] != 'admin':
                return _resp(403, {'error': 'Доступ запрещён'})
            body = json.loads(event.get('body') or '{}')
            uid = body.get('id')
            role = body.get('role')
            if role not in ('user', 'editor', 'admin'):
                return _resp(400, {'error': 'Некорректная роль'})
            cur.execute("UPDATE users SET role = %s WHERE id = %s", (role, uid))
            return _resp(200, {'success': True})

        return _resp(404, {'error': 'Not found'})
    finally:
        cur.close()
        conn.close()


def _make_session(cur, user_id: int) -> str:
    tok = secrets.token_hex(32)
    expires = datetime.utcnow() + timedelta(days=30)
    cur.execute(
        "INSERT INTO sessions (user_id, token, expires_at) VALUES (%s, %s, %s)",
        (user_id, tok, expires),
    )
    return tok


def _user_by_token(cur, token):
    if not token:
        return None
    cur.execute(
        "SELECT u.id, u.name, u.email, u.role FROM sessions s JOIN users u ON u.id = s.user_id "
        "WHERE s.token = %s AND s.expires_at > NOW()",
        (token,),
    )
    row = cur.fetchone()
    if not row:
        return None
    return {'id': row[0], 'name': row[1], 'email': row[2], 'role': row[3]}
