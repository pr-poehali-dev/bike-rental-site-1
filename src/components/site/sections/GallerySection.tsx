import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { HERO_IMG, BIKE_IMG } from '../data';

const items = [
  { img: HERO_IMG, title: 'Лесные тропы', tall: true },
  { img: BIKE_IMG, title: 'Наш парк', tall: false },
  { img: HERO_IMG, title: 'Закатный заезд', tall: false },
  { img: BIKE_IMG, title: 'Городские маршруты', tall: false },
  { img: HERO_IMG, title: 'Семейные прогулки', tall: false },
  { img: BIKE_IMG, title: 'Горные приключения', tall: true },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-20 bg-secondary/40">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="font-display uppercase tracking-widest text-primary text-sm mb-2">
            Галерея
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Моменты с маршрутов
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {items.map((it, i) => (
            <Dialog key={i}>
              <DialogTrigger asChild>
                <button
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                    it.tall ? 'row-span-2' : ''
                  }`}
                >
                  <img
                    src={it.img}
                    alt={it.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-forest-deep/0 group-hover:bg-forest-deep/40 transition-colors grid place-items-center">
                    <Icon name="ZoomIn" size={28} className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <Badge className="absolute bottom-3 left-3 bg-background/90 text-foreground border-0">
                    {it.title}
                  </Badge>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl p-2">
                <img src={it.img} alt={it.title} className="w-full rounded-lg" />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
