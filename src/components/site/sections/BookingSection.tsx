import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { BIKES, Bike } from '../data';
import { contentApi } from '@/lib/api';

const BookingSection = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [bike, setBike] = useState<string>('');
  const [hours, setHours] = useState<string>('2');
  const [bikes, setBikes] = useState<Bike[]>(BIKES);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    contentApi
      .list<Bike>('bikes')
      .then((items) => items.length && setBikes(items))
      .catch(() => undefined);
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSending(true);
    try {
      await contentApi.create('bookings', {
        name: String(fd.get('name') || ''),
        phone: String(fd.get('phone') || ''),
        bike,
        hours: Number(hours),
        booking_date: date
          ? date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
          : '',
      });
      toast({
        title: 'Заявка отправлена! 🚲',
        description: 'Мы свяжемся с вами в течение 15 минут для подтверждения.',
      });
      form.reset();
      setBike('');
    } catch (err) {
      toast({
        title: 'Ошибка отправки',
        description: (err as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="booking" className="py-20 bg-secondary/40">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="font-display uppercase tracking-widest text-primary text-sm mb-2">
            Бронирование
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Забронируй за минуту
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
          <Card className="border-border">
            <CardContent className="p-6">
              <Label className="font-display text-lg mb-4 block flex items-center gap-2">
                <Icon name="CalendarDays" size={20} className="text-primary" />
                Выберите дату
              </Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-xl border border-border w-full"
              />
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <form onSubmit={submit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="b-name">Ваше имя</Label>
                  <Input id="b-name" name="name" placeholder="Иван Иванов" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="b-phone">Телефон</Label>
                  <Input id="b-phone" name="phone" type="tel" placeholder="+7 (___) ___-__-__" required />
                </div>
                <div className="space-y-2">
                  <Label>Велосипед</Label>
                  <Select value={bike} onValueChange={setBike}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите модель" />
                    </SelectTrigger>
                    <SelectContent>
                      {bikes.map((b) => (
                        <SelectItem key={b.id} value={b.name}>
                          {b.emoji} {b.name} — {b.price}₽/час
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Кол-во часов</Label>
                  <Select value={hours} onValueChange={setHours}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 6, 8].map((h) => (
                        <SelectItem key={h} value={String(h)}>{h} ч</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {date && (
                  <Badge variant="secondary" className="gap-1">
                    <Icon name="Check" size={14} className="text-leaf" />
                    {date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                  </Badge>
                )}

                <Button type="submit" disabled={sending} className="w-full gradient-forest text-primary-foreground h-12 text-base">
                  <Icon name="CalendarCheck" size={20} /> {sending ? 'Отправка...' : 'Забронировать'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;