import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { contentApi } from '@/lib/api';

interface Loc {
  id: number;
  name: string;
  address: string;
  bikes: number;
  top: string;
  left: string;
}

interface LocApi {
  id: number;
  name: string;
  address: string;
  bikes_count: number;
  pos_top: string;
  pos_left: string;
}

const fallback: Loc[] = [
  { id: 1, name: 'Сокольники', address: 'Парк Сокольники, гл. вход', bikes: 64, top: '28%', left: '34%' },
  { id: 2, name: 'Воробьёвы горы', address: 'Смотровая площадка', bikes: 48, top: '62%', left: '52%' },
  { id: 3, name: 'ВДНХ', address: 'Главный вход, арка', bikes: 80, top: '20%', left: '66%' },
  { id: 4, name: 'Парк Горького', address: 'Крымский Вал, 9', bikes: 52, top: '70%', left: '30%' },
];

const LocationsSection = () => {
  const [active, setActive] = useState(1);
  const [locations, setLocations] = useState<Loc[]>(fallback);

  useEffect(() => {
    contentApi
      .list<LocApi>('locations')
      .then((items) => {
        if (!items.length) return;
        const mapped = items.map((l) => ({
          id: l.id,
          name: l.name,
          address: l.address,
          bikes: l.bikes_count,
          top: l.pos_top,
          left: l.pos_left,
        }));
        setLocations(mapped);
        setActive(mapped[0].id);
      })
      .catch(() => undefined);
  }, []);

  return (
    <section id="locations" className="py-20">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="font-display uppercase tracking-widest text-primary text-sm mb-2">
            Локации
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Где нас найти
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-stretch">
          <div className="relative rounded-3xl overflow-hidden gradient-sky min-h-[360px] border border-border bg-grain">
            <div className="absolute inset-0 bg-grain opacity-60" />
            {locations.map((l) => (
              <button
                key={l.id}
                onClick={() => setActive(l.id)}
                style={{ top: l.top, left: l.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
              >
                <span
                  className={`grid place-items-center w-10 h-10 rounded-full shadow-lg transition-all ${
                    active === l.id
                      ? 'gradient-forest text-primary-foreground scale-125'
                      : 'bg-background text-primary'
                  }`}
                >
                  <Icon name="MapPin" size={20} />
                </span>
                {active === l.id && (
                  <span className="absolute left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-xs font-semibold bg-background px-2 py-1 rounded-md shadow">
                    {l.name}
                  </span>
                )}
              </button>
            ))}
            <Badge className="absolute bottom-4 left-4 bg-background text-foreground border-0 shadow">
              <Icon name="Map" size={14} className="mr-1 text-primary" /> Интерактивная карта
            </Badge>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {locations.map((l) => (
              <Card
                key={l.id}
                onClick={() => setActive(l.id)}
                className={`cursor-pointer transition-all ${
                  active === l.id ? 'border-primary border-2 shadow-lg' : 'border-border'
                }`}
              >
                <CardContent className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-semibold">{l.name}</h3>
                    <Icon name="MapPin" size={18} className="text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Icon name="Navigation" size={14} /> {l.address}
                  </p>
                  <Badge variant="secondary" className="gap-1">
                    <Icon name="Bike" size={12} /> {l.bikes} велосипедов
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;