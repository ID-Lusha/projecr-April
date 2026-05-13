"use client";

import { FadeInView } from "@/components/animations/FadeInView";
import { cn } from "@/lib/cn";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "А вдруг ИИ нагрубит моему клиенту?",
    a: "У нас 3 уровня защиты: встроенные фильтры нецензурной лексики, кастомные правила поведения под вашу нишу и контроль качества диалогов первые 2 недели после запуска. Все ответы ИИ обучены на лучших скриптах продаж — он всегда вежлив и по делу.",
  },
  {
    q: "У меня уже есть CRM и менеджеры. Это им замена?",
    a: "Нет — это дополнение. ИИ берёт на себя первичную обработку входящих, квалификацию («горячий/холодный») и ночные смены. Менеджеры занимаются только тёплыми лидами, которые уже готовы к разговору. Нагрузка падает, конверсия растёт.",
  },
  {
    q: "Сколько это стоит?",
    a: "Зависит от ниши, объёма заявок и набора интеграций. Есть два формата: «ИИ-внедрение» (подключаем ИИ-менеджера и дашборд к вашей текущей системе, запуск за 7 дней) и «Полный комплекс под ключ» (реклама + лендинг + ИИ + CRM, запуск за 14–21 день). Окупаемость — от 14 дней. Точную цифру и ROI-расчёт для вашего бизнеса даём на бесплатном 30-минутном созвоне.",
  },
  {
    q: "Как быстро запустите?",
    a: "Базовая ИИ-воронка — за 7 рабочих дней. Полная экосистема (реклама + лендинг + ИИ + CRM) — 14–21 день. После сдачи поддерживаем и дорабатываем систему.",
  },
  {
    q: "А если не сработает?",
    a: "Фиксируем KPI на этапе договора: время ответа, конверсия, стоимость лида. Если не достигаем — возвращаемся к работе до результата без доплат. Нам важен ваш долгосрочный результат, а не разовая оплата.",
  },
  {
    q: "Это безопасно для данных моих клиентов?",
    a: "Данные хранятся в вашей CRM и на ваших серверах — мы не храним персональные данные ваших клиентов у себя. Подписываем NDA перед стартом. Соответствие GDPR и международным стандартам защиты персональных данных.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-none">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold sm:text-base hover:text-accent transition-colors"
      >
        <span>{q}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden text-sm text-muted-foreground leading-relaxed transition-all duration-300",
          open ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {a}
      </div>
    </div>
  );
}

export function FAQSection() {
  return (
    <section id="faq" className="py-20 px-4 md:py-32">
      <div className="mx-auto max-w-3xl">
        <FadeInView>
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Часто задаваемые{" "}
            <span className="text-accent">вопросы</span>
          </h2>
        </FadeInView>

        <FadeInView delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-muted-foreground sm:text-lg">
            Собрали самые частые возражения — скорее всего, ваш вопрос уже здесь.
          </p>
        </FadeInView>

        <FadeInView delay={0.2}>
          <div className="mt-10 rounded-xl border border-border bg-background px-5 sm:px-6">
            {faqs.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
