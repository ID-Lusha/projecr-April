"use client";

import { FadeInView } from "@/components/animations/FadeInView";
import { Clock, TrendingDown, DollarSign } from "lucide-react";

const problems = [
  {
    icon: Clock,
    stat: "30 мин",
    text: "Среднее время ответа менеджера. Клиент ждать не будет.",
  },
  {
    icon: TrendingDown,
    stat: "70%",
    text: "Клиентов уходят к конкурентам, пока ждут ответ на заявку.",
  },
  {
    icon: DollarSign,
    stat: "×3",
    text: "Рост стоимости привлечения клиента за последние 2 года.",
  },
];

export function ProblemSection() {
  return (
    <section id="problem" className="py-20 px-4 md:py-32">
      <div className="mx-auto max-w-5xl">
        <FadeInView>
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Трафик дорожает, а менеджеры
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">не справляются</span>
          </h2>
        </FadeInView>

        <FadeInView delay={0.1}>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-muted-foreground sm:text-lg">
            Вы платите за рекламу, но теряете деньги на этапе обработки.
            Пока менеджер берет трубку — клиент уже у конкурента.
          </p>
        </FadeInView>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 md:mt-16">
          {problems.map((item, i) => (
            <FadeInView key={i} delay={0.1 * (i + 1)}>
              <div className="flex flex-col items-center rounded-lg border border-border bg-background p-6 text-center transition-colors hover:bg-muted/50 sm:p-8">
                <item.icon className="mb-4 h-8 w-8 text-accent" />
                <span className="text-4xl font-bold tracking-tight sm:text-5xl">
                  {item.stat}
                </span>
                <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                  {item.text}
                </p>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
