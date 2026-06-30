import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { contentApi } from '@/lib/api';

interface Review {
  id?: number;
  name: string;
  role: string;
  text: string;
  rating: number;
}

const fallback: Review[] = [
  { name: 'Анна Светлова', role: 'Велопрогулки', text: 'Брали электровелосипеды на весь день — восторг! Доставили вовремя, всё чистое и заряженное.', rating: 5 },
  { name: 'Игорь Петров', role: 'Горный туризм', text: 'Trail X — топ для трейлов. Подвеска мягкая, переключения чёткие. Вернусь точно.', rating: 5 },
  { name: 'Мария Котова', role: 'Семейный отдых', text: 'Взяли детский и два городских. Дети в восторге, цены адекватные. Спасибо за шлемы!', rating: 5 },
  { name: 'Дмитрий Лес', role: 'Каждый день', text: 'Абонемент окупается за неделю. Катаюсь на работу — экономлю и здоровье, и деньги.', rating: 5 },
];

const colors = ['bg-forest', 'bg-wood', 'bg-sky', 'bg-leaf'];

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>(fallback);

  useEffect(() => {
    contentApi
      .list<Review>('reviews')
      .then((items) => items.length && setReviews(items))
      .catch(() => undefined);
  }, []);

  return (
    <section id="reviews" className="py-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-display uppercase tracking-widest text-primary text-sm mb-2">
              Отзывы
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Нас рекомендуют
            </h2>
          </div>
          <Badge variant="secondary" className="gap-2 text-base px-4 py-2 w-fit">
            <Icon name="Star" size={18} className="text-leaf" />
            <span className="font-bold">4.9</span> из 5 · 2 340 оценок
          </Badge>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => (
            <Card
              key={r.id ?? r.name}
              className="border-border hover:shadow-lg transition-all animate-fade-in"
              style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, idx) => (
                    <Icon key={idx} name="Star" size={16} className="text-leaf fill-leaf" />
                  ))}
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">«{r.text}»</p>
                <div className="flex items-center gap-3 pt-2">
                  <Avatar>
                    <AvatarFallback className={`${colors[i % colors.length]} text-primary-foreground font-semibold`}>
                      {r.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;