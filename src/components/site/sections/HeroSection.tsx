import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { HERO_IMG } from '../data';

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const stats = [
  { value: '500+', label: 'велосипедов' },
  { value: '12', label: 'локаций' },
  { value: '50к', label: 'довольных гостей' },
  { value: '4.9', label: 'рейтинг' },
];

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Велопрогулка в лесу" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/85 via-forest-deep/55 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10 pt-24 pb-16">
        <div className="max-w-2xl text-primary-foreground space-y-6 animate-fade-in">
          <Badge className="bg-leaf/90 text-forest-deep hover:bg-leaf border-0 px-4 py-1.5 text-sm">
            <Icon name="Leaf" size={14} className="mr-1" /> Эко-транспорт для всех
          </Badge>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] uppercase">
            Открой природу <br />
            <span className="text-leaf">на двух колёсах</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/85 max-w-xl">
            Прокат городских, горных и электровелосипедов. Бронируй онлайн за
            минуту — мы доставим прямо к старту маршрута.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              size="lg"
              onClick={() => scrollTo('booking')}
              className="bg-leaf text-forest-deep hover:bg-leaf/90 text-base h-12 px-7"
            >
              <Icon name="CalendarCheck" size={20} /> Забронировать
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo('catalog')}
              className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 text-base h-12 px-7"
            >
              <Icon name="Bike" size={20} /> Смотреть каталог
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-4 pt-8 max-w-lg">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl md:text-4xl font-bold text-leaf">
                  {s.value}
                </div>
                <div className="text-xs md:text-sm text-primary-foreground/70">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollTo('features')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary-foreground/80 animate-float"
      >
        <Icon name="ChevronDown" size={32} />
      </button>
    </section>
  );
};

export default HeroSection;
