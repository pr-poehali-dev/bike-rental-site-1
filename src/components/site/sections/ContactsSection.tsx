import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const contacts = [
  { icon: 'MapPin', title: 'Адрес', value: 'Москва, Парк Сокольники, гл. вход' },
  { icon: 'Phone', title: 'Телефон', value: '+7 (495) 123-45-67' },
  { icon: 'Mail', title: 'Почта', value: 'hello@velotropa.ru' },
  { icon: 'Clock', title: 'Часы работы', value: 'Ежедневно 8:00 – 22:00' },
];

const ContactsSection = () => {
  const { toast } = useToast();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Сообщение отправлено! ✉️',
      description: 'Мы ответим вам в ближайшее время.',
    });
  };

  return (
    <section id="contacts" className="py-20 bg-secondary/40">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="font-display uppercase tracking-widest text-primary text-sm mb-2">
            Контакты
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Свяжитесь с нами
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
          <div className="space-y-4">
            {contacts.map((c) => (
              <Card key={c.title} className="border-border">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="grid place-items-center w-12 h-12 rounded-xl gradient-forest text-primary-foreground shrink-0">
                    <Icon name={c.icon} size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{c.title}</p>
                    <p className="font-semibold">{c.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border">
            <CardContent className="p-6">
              <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="c-name">Имя</Label>
                  <Input id="c-name" placeholder="Ваше имя" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-email">E-mail</Label>
                  <Input id="c-email" type="email" placeholder="you@mail.ru" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-msg">Сообщение</Label>
                  <Textarea id="c-msg" placeholder="Чем можем помочь?" rows={4} required />
                </div>
                <Button type="submit" className="w-full gradient-forest text-primary-foreground h-12">
                  <Icon name="Send" size={18} /> Отправить сообщение
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
