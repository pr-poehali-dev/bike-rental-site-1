export const HERO_IMG =
  'https://cdn.poehali.dev/projects/76d28d35-49b2-41a1-a798-348a017f7fed/files/541090cf-4a08-4c1f-91ed-c6822f4eb7c0.jpg';
export const BIKE_IMG =
  'https://cdn.poehali.dev/projects/76d28d35-49b2-41a1-a798-348a017f7fed/files/73cef607-9389-4492-8824-7b14a9503ad2.jpg';

export const NAV_LINKS = [
  { id: 'hero', label: 'Главная' },
  { id: 'catalog', label: 'Каталог' },
  { id: 'pricing', label: 'Цены' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'about', label: 'О нас' },
  { id: 'locations', label: 'Локации' },
  { id: 'booking', label: 'Бронирование' },
  { id: 'faq', label: 'FAQ' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'partners', label: 'Партнёры' },
  { id: 'blog', label: 'Блог' },
  { id: 'contacts', label: 'Контакты' },
];

export type Bike = {
  id: number;
  name: string;
  category: 'Город' | 'Горный' | 'Электро' | 'Детский';
  price: number;
  rating: number;
  speeds: number;
  weight: number;
  emoji: string;
  badge?: string;
};

export const BIKES: Bike[] = [
  { id: 1, name: 'Городской Cruiser', category: 'Город', price: 350, rating: 4.8, speeds: 7, weight: 14, emoji: '🚲', badge: 'Хит' },
  { id: 2, name: 'Горный Trail X', category: 'Горный', price: 550, rating: 4.9, speeds: 21, weight: 13, emoji: '🚵', badge: 'Топ' },
  { id: 3, name: 'Электро Volt', category: 'Электро', price: 850, rating: 5.0, speeds: 9, weight: 22, emoji: '⚡', badge: 'Новинка' },
  { id: 4, name: 'Малыш Junior', category: 'Детский', price: 200, rating: 4.7, speeds: 1, weight: 8, emoji: '🧒' },
  { id: 5, name: 'Городской Comfort', category: 'Город', price: 400, rating: 4.6, speeds: 8, weight: 15, emoji: '🚲' },
  { id: 6, name: 'Горный Rock Pro', category: 'Горный', price: 650, rating: 4.9, speeds: 24, weight: 12, emoji: '🚵', badge: 'Топ' },
  { id: 7, name: 'Электро Eco Ride', category: 'Электро', price: 780, rating: 4.8, speeds: 7, weight: 20, emoji: '⚡' },
  { id: 8, name: 'Малыш Mini', category: 'Детский', price: 180, rating: 4.5, speeds: 1, weight: 7, emoji: '🧒' },
];

export const CATEGORIES = ['Все', 'Город', 'Горный', 'Электро', 'Детский'] as const;
