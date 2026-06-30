import { Resource } from '@/lib/api';

export type FieldType = 'text' | 'textarea' | 'number' | 'boolean' | 'select' | 'list';

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
  hideInTable?: boolean;
}

export interface ResourceDef {
  resource: Resource;
  title: string;
  icon: string;
  singular: string;
  readOnly?: boolean;
  fields: FieldDef[];
}

export const RESOURCE_DEFS: ResourceDef[] = [
  {
    resource: 'bikes',
    title: 'Каталог',
    icon: 'Bike',
    singular: 'велосипед',
    fields: [
      { key: 'name', label: 'Название', type: 'text' },
      { key: 'category', label: 'Категория', type: 'select', options: ['Город', 'Горный', 'Электро', 'Детский'] },
      { key: 'price', label: 'Цена (₽/час)', type: 'number' },
      { key: 'rating', label: 'Рейтинг', type: 'number' },
      { key: 'speeds', label: 'Скорости', type: 'number' },
      { key: 'weight', label: 'Вес (кг)', type: 'number' },
      { key: 'emoji', label: 'Эмодзи', type: 'text' },
      { key: 'badge', label: 'Бейдж', type: 'text', placeholder: 'Хит / Топ...' },
      { key: 'is_active', label: 'Активен', type: 'boolean' },
      { key: 'sort_order', label: 'Порядок', type: 'number', hideInTable: true },
    ],
  },
  {
    resource: 'pricing',
    title: 'Тарифы',
    icon: 'BadgePercent',
    singular: 'тариф',
    fields: [
      { key: 'name', label: 'Название', type: 'text' },
      { key: 'price', label: 'Цена', type: 'text' },
      { key: 'unit', label: 'Единица', type: 'text', placeholder: '₽/час' },
      { key: 'description', label: 'Описание', type: 'text' },
      { key: 'features', label: 'Преимущества', type: 'list', hideInTable: true },
      { key: 'is_popular', label: 'Популярный', type: 'boolean' },
      { key: 'sort_order', label: 'Порядок', type: 'number', hideInTable: true },
    ],
  },
  {
    resource: 'reviews',
    title: 'Отзывы',
    icon: 'Star',
    singular: 'отзыв',
    fields: [
      { key: 'name', label: 'Имя', type: 'text' },
      { key: 'role', label: 'Подпись', type: 'text' },
      { key: 'text', label: 'Текст', type: 'textarea' },
      { key: 'rating', label: 'Оценка', type: 'number' },
      { key: 'is_published', label: 'Опубликован', type: 'boolean' },
    ],
  },
  {
    resource: 'locations',
    title: 'Локации',
    icon: 'MapPin',
    singular: 'локацию',
    fields: [
      { key: 'name', label: 'Название', type: 'text' },
      { key: 'address', label: 'Адрес', type: 'text' },
      { key: 'bikes_count', label: 'Кол-во велосипедов', type: 'number' },
      { key: 'pos_top', label: 'Позиция Top', type: 'text', placeholder: '50%', hideInTable: true },
      { key: 'pos_left', label: 'Позиция Left', type: 'text', placeholder: '50%', hideInTable: true },
      { key: 'sort_order', label: 'Порядок', type: 'number', hideInTable: true },
    ],
  },
  {
    resource: 'partners',
    title: 'Партнёры',
    icon: 'Handshake',
    singular: 'партнёра',
    fields: [
      { key: 'name', label: 'Название', type: 'text' },
      { key: 'icon', label: 'Иконка', type: 'text', placeholder: 'Trees' },
      { key: 'description', label: 'Описание', type: 'textarea' },
      { key: 'sort_order', label: 'Порядок', type: 'number', hideInTable: true },
    ],
  },
  {
    resource: 'blog',
    title: 'Блог',
    icon: 'Newspaper',
    singular: 'статью',
    fields: [
      { key: 'title', label: 'Заголовок', type: 'text' },
      { key: 'tag', label: 'Рубрика', type: 'text' },
      { key: 'image', label: 'Картинка (URL)', type: 'text', hideInTable: true },
      { key: 'excerpt', label: 'Анонс', type: 'textarea' },
      { key: 'read_time', label: 'Время чтения', type: 'text', placeholder: '5 мин' },
      { key: 'is_published', label: 'Опубликована', type: 'boolean' },
    ],
  },
  {
    resource: 'faqs',
    title: 'FAQ',
    icon: 'HelpCircle',
    singular: 'вопрос',
    fields: [
      { key: 'question', label: 'Вопрос', type: 'text' },
      { key: 'answer', label: 'Ответ', type: 'textarea' },
      { key: 'sort_order', label: 'Порядок', type: 'number', hideInTable: true },
    ],
  },
  {
    resource: 'bookings',
    title: 'Заявки',
    icon: 'CalendarCheck',
    singular: 'заявку',
    fields: [
      { key: 'name', label: 'Имя', type: 'text' },
      { key: 'phone', label: 'Телефон', type: 'text' },
      { key: 'bike', label: 'Велосипед', type: 'text' },
      { key: 'hours', label: 'Часов', type: 'number' },
      { key: 'booking_date', label: 'Дата', type: 'text' },
      { key: 'status', label: 'Статус', type: 'select', options: ['new', 'confirmed', 'done', 'cancelled'] },
    ],
  },
  {
    resource: 'contacts',
    title: 'Обращения',
    icon: 'Mail',
    singular: 'обращение',
    fields: [
      { key: 'name', label: 'Имя', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'message', label: 'Сообщение', type: 'textarea' },
      { key: 'status', label: 'Статус', type: 'select', options: ['new', 'answered', 'closed'] },
    ],
  },
];
