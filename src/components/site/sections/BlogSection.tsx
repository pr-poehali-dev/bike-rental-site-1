import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { HERO_IMG, BIKE_IMG } from '../data';

const posts = [
  { img: HERO_IMG, tag: 'Маршруты', date: '24 июня', title: '7 лесных троп для летних выходных', read: '5 мин' },
  { img: BIKE_IMG, tag: 'Советы', date: '18 июня', title: 'Как выбрать велосипед под свой стиль', read: '7 мин' },
  { img: HERO_IMG, tag: 'Здоровье', date: '10 июня', title: 'Почему велосипед лучше спортзала', read: '4 мин' },
];

const BlogSection = () => {
  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-display uppercase tracking-widest text-primary text-sm mb-2">
              Блог
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Истории и советы
            </h2>
          </div>
          <Button variant="outline" className="w-fit">
            Все статьи <Icon name="ArrowRight" size={18} />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <Card
              key={i}
              className="group overflow-hidden border-border hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-3 left-3 bg-leaf text-forest-deep border-0">
                  {p.tag}
                </Badge>
              </div>
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="Calendar" size={14} /> {p.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={14} /> {p.read}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-medium story-link">
                  Читать <Icon name="ArrowRight" size={14} />
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
