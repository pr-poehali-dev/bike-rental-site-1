import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { contentApi } from '@/lib/api';

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

interface Plan {
  id?: number;
  name: string;
  price: string;
  unit: string;
  description?: string;
  desc?: string;
  features: string[];
  is_popular?: boolean;
  popular?: boolean;
}

const fallback: Plan[] = [
  { name: 'Час', price: '350', unit: '₽/час', desc: 'Быстрая прогулка по парку', features: ['Любой городской велосипед', 'Шлем в подарок', 'Базовая страховка'], popular: false },
  { name: 'День', price: '1 500', unit: '₽/день', desc: 'Полноценное путешествие', features: ['Любая категория', 'Шлем + замок', 'Полная страховка', 'Доставка к старту'], popular: true },
  { name: 'Абонемент', price: '6 900', unit: '₽/мес', desc: 'Для тех, кто катается часто', features: ['Безлимит будни', 'Приоритетная бронь', 'VIP-сервис 24/7', 'Скидка 20% на друзей'], popular: false },
];

const PricingSection = () => {
  const [plans, setPlans] = useState<Plan[]>(fallback);

  useEffect(() => {
    contentApi
      .list<Plan>('pricing')
      .then((items) => items.length && setPlans(items))
      .catch(() => undefined);
  }, []);

  const isPopular = (p: Plan) => p.is_popular ?? p.popular ?? false;
  const getDesc = (p: Plan) => p.description ?? p.desc ?? '';

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="font-display uppercase tracking-widest text-primary text-sm mb-2">
            Тарифы
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">Честные цены</h2>
          <p className="text-muted-foreground mt-3">
            Без скрытых платежей — выбирайте удобный формат аренды.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((p) => (
            <Card
              key={p.id ?? p.name}
              className={`relative ${
                isPopular(p)
                  ? 'border-primary border-2 shadow-xl md:scale-105'
                  : 'border-border'
              }`}
            >
              {isPopular(p) && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-forest text-primary-foreground border-0">
                  Популярный
                </Badge>
              )}
              <CardHeader className="text-center pb-2">
                <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{getDesc(p)}</p>
                <div className="pt-3">
                  <span className="font-display text-4xl font-bold text-primary">{p.price}</span>
                  <span className="text-muted-foreground"> {p.unit}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Separator />
                <ul className="space-y-3">
                  {(p.features || []).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Icon name="CheckCircle2" size={18} className="text-leaf shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => scrollTo('booking')}
                  className={`w-full ${
                    isPopular(p)
                      ? 'gradient-forest text-primary-foreground'
                      : ''
                  }`}
                  variant={isPopular(p) ? 'default' : 'outline'}
                >
                  Выбрать тариф
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;