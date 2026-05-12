"use client";

import { FadeInView } from "@/components/animations/FadeInView";
import { ChatContainer } from "@/components/chat/ChatContainer";

export function DemoSection() {
  return (
    <section id="demo" className="py-20 px-4 md:py-32">
      <div className="mx-auto max-w-5xl">
        <FadeInView>
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Проверьте ИИ{" "}
            <span className="text-accent">в деле</span>
          </h2>
        </FadeInView>

        <FadeInView delay={0.1}>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-muted-foreground sm:text-lg">
            Попробуйте не купить свой же продукт. Введите нишу — и наш ИИ
            попытается закрыть вас на сделку.
          </p>
        </FadeInView>

        <FadeInView delay={0.2} className="mt-10 md:mt-14">
          <ChatContainer />
        </FadeInView>
      </div>
    </section>
  );
}
