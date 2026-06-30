import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { BIKES, CATEGORIES } from '../data';

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const CatalogSection = () => {
  const [cat, setCat] = useState<string>('Все');
  const list = cat === 'Все' ? BIKES : BIKES.filter((b) => b.category === cat);

  return (
    <section id="catalog" className="py-20 bg-secondary/40">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-display uppercase tracking-widest text-primary text-sm mb-2">
              Каталог
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Выбери свой велосипед
            </h2>
          </div>
          <Tabs value={cat} onValueChange={setCat}>
            <TabsList className="bg-background flex-wrap h-auto">
              {CATEGORIES.map((c) => (
                <TabsTrigger key={c} value={c} className="data-[state=active]:gradient-forest data-[state=active]:text-primary-foreground">
                  {c}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((b, i) => (
            <Card
              key={b.id}
              className="group overflow-hidden border-border hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${i * 60}ms`, opacity: 0 }}
            >
              <div className="relative h-40 gradient-sky grid place-items-center text-6xl group-hover:scale-110 transition-transform duration-300">
                {b.emoji}
                {b.badge && (
                  <Badge className="absolute top-3 left-3 bg-leaf text-forest-deep border-0">
                    {b.badge}
                  </Badge>
                )}
                <Badge variant="secondary" className="absolute top-3 right-3 gap-1">
                  <Icon name="Star" size={12} className="text-leaf" /> {b.rating}
                </Badge>
              </div>
              <CardContent className="p-5 space-y-3">
                <div>
                  <Badge variant="outline" className="mb-2 text-xs">{b.category}</Badge>
                  <h3 className="font-display text-lg font-semibold">{b.name}</h3>
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="Gauge" size={14} /> {b.speeds} ск.
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Weight" size={14} /> {b.weight} кг
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="font-display text-2xl font-bold text-primary">{b.price}₽</span>
                    <span className="text-muted-foreground text-sm">/час</span>
                  </div>
                  <Button size="sm" onClick={() => scrollTo('booking')} className="gradient-forest text-primary-foreground">
                    Арендовать
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
