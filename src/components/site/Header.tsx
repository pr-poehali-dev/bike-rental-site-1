import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { NAV_LINKS } from './data';

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20">
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 font-display text-xl md:text-2xl font-bold text-primary"
        >
          <span className="grid place-items-center w-9 h-9 rounded-full gradient-forest text-primary-foreground">
            <Icon name="Bike" size={20} />
          </span>
          ВелоТропа
        </button>

        <nav className="hidden lg:flex items-center gap-5">
          {NAV_LINKS.slice(0, 8).map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="story-link text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => scrollTo('booking')}
            className="hidden sm:inline-flex gradient-forest text-primary-foreground hover:opacity-90"
          >
            <Icon name="CalendarCheck" size={18} />
            Забронировать
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Icon name="Menu" size={22} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="font-display text-primary flex items-center gap-2">
                  <Icon name="Bike" size={20} /> ВелоТропа
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 mt-6">
                {NAV_LINKS.map((l) => (
                  <SheetClose asChild key={l.id}>
                    <button
                      onClick={() => scrollTo(l.id)}
                      className="text-left px-3 py-2.5 rounded-lg hover:bg-secondary text-foreground/90 font-medium transition-colors"
                    >
                      {l.label}
                    </button>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
