import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const steps = [
  { icon: 'MousePointerClick', title: 'Выберите модель', text: 'Подберите велосипед в каталоге под свою задачу.' },
  { icon: 'CalendarCheck', title: 'Забронируйте дату', text: 'Укажите день и время — мы подтвердим бронь.' },
  { icon: 'Truck', title: 'Получите доставку', text: 'Привезём велосипед к старту маршрута бесплатно.' },
  { icon: 'Bike', title: 'Катайтесь!', text: 'Наслаждайтесь поездкой, сервис на связи 24/7.' },
];

const HowItWorksSection = () => {
  return (
    <section id="how" className="py-20">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-display uppercase tracking-widest text-primary text-sm mb-2">
            Как это работает
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Четыре простых шага
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-4 relative">
          {steps.map((s, i) => (
            <Card key={s.title} className="relative border-border hover:shadow-lg transition-all">
              <CardContent className="p-7 text-center space-y-4">
                <div className="relative mx-auto w-16 h-16 grid place-items-center rounded-2xl gradient-forest text-primary-foreground">
                  <Icon name={s.icon} size={28} />
                  <span className="absolute -top-2 -right-2 w-7 h-7 grid place-items-center rounded-full bg-leaf text-forest-deep font-display font-bold text-sm shadow">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
