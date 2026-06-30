import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { BIKES } from '../data';

const compareList = [BIKES[0], BIKES[1], BIKES[2], BIKES[5]];

const CompareSection = () => {
  return (
    <section id="compare" className="py-20 bg-secondary/40">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="font-display uppercase tracking-widest text-primary text-sm mb-2">
            Сравнение
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Подберите идеальную модель
          </h2>
        </div>

        <Card className="overflow-x-auto p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-display">Модель</TableHead>
                <TableHead className="font-display">Категория</TableHead>
                <TableHead className="font-display text-center">Скорости</TableHead>
                <TableHead className="font-display text-center">Вес</TableHead>
                <TableHead className="font-display text-center">Рейтинг</TableHead>
                <TableHead className="font-display text-right">Цена/час</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {compareList.map((b) => (
                <TableRow key={b.id} className="hover:bg-secondary/60">
                  <TableCell className="font-medium">
                    <span className="mr-2">{b.emoji}</span>
                    {b.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{b.category}</Badge>
                  </TableCell>
                  <TableCell className="text-center">{b.speeds}</TableCell>
                  <TableCell className="text-center">{b.weight} кг</TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center gap-1">
                      <Icon name="Star" size={14} className="text-leaf" /> {b.rating}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-display font-bold text-primary">
                    {b.price}₽
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </section>
  );
};

export default CompareSection;
