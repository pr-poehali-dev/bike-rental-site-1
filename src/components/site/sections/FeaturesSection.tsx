import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const features = [
  { icon: 'Zap', title: 'Бронь за минуту', text: 'Онлайн-календарь и мгновенное подтверждение брони.' },
  { icon: 'Truck', title: 'Доставка к старту', text: 'Привезём велосипед в любую точку города бесплатно.' },
  { icon: 'ShieldCheck', title: 'Страховка включена', text: 'Каждая аренда защищена от поломок и угона.' },
  { icon: 'Wrench', title: 'Сервис 24/7', text: 'Техподдержка на маршруте и быстрая замена.' },
  { icon: 'Leaf', title: 'Эко-подход', text: 'Сохраняем природу — никаких выбросов CO₂.' },
  { icon: 'BadgePercent', title: 'Гибкие тарифы', text: 'Час, день или абонемент — платите за нужное.' },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-grain">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="font-display uppercase tracking-widest text-primary text-sm mb-2">
            Почему мы
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Всё для вашей поездки
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Card
              key={f.title}
              className="group border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
            >
              <CardContent className="p-7">
                <div className="grid place-items-center w-14 h-14 rounded-2xl bg-secondary text-primary mb-5 group-hover:gradient-forest group-hover:text-primary-foreground transition-all">
                  <Icon name={f.icon} size={26} />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
