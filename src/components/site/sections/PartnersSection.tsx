import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const partners = [
  { name: 'GreenCity', icon: 'Trees', desc: 'Городская программа озеленения и эко-маршрутов.' },
  { name: 'VeloSport', icon: 'Medal', desc: 'Поставщик профессиональных горных велосипедов.' },
  { name: 'EcoTour', icon: 'Compass', desc: 'Организация природных велотуров по России.' },
  { name: 'SafeRide', icon: 'ShieldCheck', desc: 'Страховой партнёр для всех арендаторов.' },
  { name: 'ChargeUp', icon: 'BatteryCharging', desc: 'Сеть зарядных станций для электровелосипедов.' },
  { name: 'TrailMap', icon: 'Map', desc: 'Цифровые карты лучших веломаршрутов.' },
];

const PartnersSection = () => {
  return (
    <section id="partners" className="py-20 bg-secondary/40">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="font-display uppercase tracking-widest text-primary text-sm mb-2">
            Партнёры
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Нам доверяют
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners.map((p) => (
            <HoverCard key={p.name}>
              <HoverCardTrigger asChild>
                <Card className="p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-lg hover:border-primary/40 transition-all">
                  <Icon name={p.icon} size={32} className="text-primary" />
                  <span className="font-display font-semibold text-sm">{p.name}</span>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="text-sm">
                <p className="font-semibold mb-1">{p.name}</p>
                <p className="text-muted-foreground">{p.desc}</p>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
