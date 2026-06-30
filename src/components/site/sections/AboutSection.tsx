import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { BIKE_IMG } from '../data';

const skills = [
  { label: 'Исправность парка', value: 99 },
  { label: 'Довольных клиентов', value: 96 },
  { label: 'Доставка вовремя', value: 94 },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-secondary/40">
      <div className="container mx-auto grid gap-12 lg:grid-cols-2 items-center">
        <div className="relative animate-fade-in" style={{ opacity: 0 }}>
          <img
            src={BIKE_IMG}
            alt="Велосипед на природе"
            className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
          />
          <div className="absolute -bottom-6 -right-4 bg-background rounded-2xl shadow-xl p-5 border border-border">
            <div className="font-display text-4xl font-bold text-primary">8 лет</div>
            <div className="text-sm text-muted-foreground">на маршрутах</div>
          </div>
        </div>

        <div className="space-y-6">
          <Badge variant="outline" className="text-primary border-primary/40">
            <Icon name="Leaf" size={14} className="mr-1" /> О компании
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            Мы любим природу и движение
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            ВелоТропа началась с маленького пункта проката у леса. Сегодня это
            сеть из 12 локаций и парк из 500+ ухоженных велосипедов. Мы верим,
            что велосипед — это свобода, здоровье и забота о планете.
          </p>

          <div className="space-y-5 pt-2">
            {skills.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">{s.label}</span>
                  <span className="text-primary font-semibold">{s.value}%</span>
                </div>
                <Progress value={s.value} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
