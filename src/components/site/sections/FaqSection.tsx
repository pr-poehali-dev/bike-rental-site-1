import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const faqs = [
  { q: 'Какие документы нужны для аренды?', a: 'Достаточно паспорта и залога (или привязки карты). Для абонемента оформляем договор онлайн за 2 минуты.' },
  { q: 'Что входит в стоимость проката?', a: 'Велосипед, шлем, базовая страховка и техподдержка на маршруте. При аренде на день добавляем замок и бесплатную доставку.' },
  { q: 'Можно ли продлить аренду?', a: 'Да, продлить можно прямо из приложения или звонком. Оплата рассчитывается автоматически по выбранному тарифу.' },
  { q: 'Что делать при поломке на маршруте?', a: 'Звоните в поддержку 24/7 — мы привезём замену или отремонтируем на месте. Страховка покрывает большинство случаев.' },
  { q: 'Доставляете ли вы велосипеды?', a: 'Да, бесплатная доставка к старту маршрута при аренде от одного дня. Для почасовой аренды доставка по символической цене.' },
  { q: 'Есть ли детские велосипеды?', a: 'Конечно! У нас есть модели Junior и Mini для детей, а также детские кресла и прицепы по запросу.' },
];

const FaqSection = () => {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <p className="font-display uppercase tracking-widest text-primary text-sm mb-2">
            FAQ
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Частые вопросы
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-border rounded-2xl px-5 bg-card"
            >
              <AccordionTrigger className="text-left font-display text-lg hover:no-underline">
                <span className="flex items-center gap-3">
                  <Icon name="HelpCircle" size={20} className="text-primary shrink-0" />
                  {f.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pl-9">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
