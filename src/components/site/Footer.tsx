import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { NAV_LINKS } from './data';

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const Footer = () => {
  return (
    <footer className="gradient-forest text-primary-foreground">
      <div className="container mx-auto py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-display text-2xl font-bold">
              <Icon name="Bike" size={26} /> ВелоТропа
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Прокат велосипедов для города и природы. Свобода движения с заботой
              об экологии.
            </p>
            <div className="flex gap-2">
              {['Send', 'Instagram', 'Youtube', 'Facebook'].map((ic) => (
                <a
                  key={ic}
                  href="#"
                  className="grid place-items-center w-10 h-10 rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/25 transition-colors"
                >
                  <Icon name={ic} size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 uppercase tracking-wide text-sm">
              Навигация
            </h4>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.slice(0, 6).map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollTo(l.id)}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 uppercase tracking-wide text-sm">
              Контакты
            </h4>
            <ul className="space-y-3 text-sm text-primary-foreground/85">
              <li className="flex items-center gap-2">
                <Icon name="MapPin" size={16} /> Москва, Парк Сокольники
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Phone" size={16} /> +7 (495) 123-45-67
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Mail" size={16} /> hello@velotropa.ru
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Clock" size={16} /> Ежедневно 8:00 – 22:00
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 uppercase tracking-wide text-sm">
              Рассылка
            </h4>
            <p className="text-sm text-primary-foreground/80 mb-3">
              Скидки и новые маршруты раз в месяц.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="E-mail"
                className="bg-primary-foreground/15 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="secondary" size="icon">
                <Icon name="Send" size={18} />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/75">
          <p>© 2026 ВелоТропа. Все права защищены.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-primary-foreground">Политика конфиденциальности</a>
            <a href="#" className="hover:text-primary-foreground">Условия проката</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
