import type { Metadata } from "next";
import Link from "next/link";
import { CONTACTS } from "@/lib/contacts";

export const metadata: Metadata = {
  title: "Условия использования — AI Sales Platform",
  description: "Условия использования сервиса AI Sales Platform.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← На главную
        </Link>

        <h1 className="text-3xl font-bold tracking-tight">Условия использования</h1>
        <p className="mt-2 text-sm text-muted-foreground">Последнее обновление: май 2026 г.</p>

        <div className="prose-section mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">

          <p>
            Настоящие Условия использования регулируют отношения между{" "}
            <span className="font-medium text-foreground">{CONTACTS.company}</span> (далее —
            «Платформа», «мы») и пользователями сайта и сервисов Платформы (далее — «вы»).
            Используя сайт, вы соглашаетесь с данными Условиями в полном объёме.
          </p>

          <h2>1. Описание сервиса</h2>
          <p>
            AI Sales Platform предоставляет B2B-услуги по внедрению систем автоматизации продаж:
            настройку рекламных кампаний, разработку конверсионных лендингов, создание и интеграцию
            ИИ-ассистентов, подключение CRM-систем и платёжных шлюзов, а также аналитику
            для собственников бизнеса.
          </p>

          <h2>2. Порядок заключения договора</h2>
          <p>
            Оставляя заявку на сайте, вы подтверждаете, что являетесь дееспособным физическим лицом
            или уполномоченным представителем юридического лица. Заявка не является офертой —
            конкретные условия сотрудничества согласовываются на индивидуальном созвоне.
          </p>

          <h2>3. Использование демо-чата</h2>
          <p>
            Интерактивный ИИ-чат предназначен исключительно для демонстрационных целей. Запрещается
            использовать чат для получения юридических, медицинских или финансовых консультаций,
            а также для распространения информации, нарушающей законодательство РК и РФ.
          </p>

          <h2>4. Интеллектуальная собственность</h2>
          <p>
            Весь контент Платформы — тексты, изображения, логотипы, программный код — является
            собственностью {CONTACTS.company} или используется по лицензии. Копирование и
            распространение без письменного разрешения запрещено.
          </p>

          <h2>5. Ограничение ответственности</h2>
          <p>
            Платформа не гарантирует конкретных финансовых результатов. Показатели конверсии и ROI,
            указанные на сайте, являются средними значениями на основе опыта клиентов и могут
            отличаться в зависимости от ниши, бюджета и рыночной ситуации.
          </p>

          <h2>6. Изменение условий</h2>
          <p>
            Мы оставляем за собой право изменять Условия в любое время. Актуальная версия всегда
            доступна на данной странице. Продолжение использования сайта означает согласие
            с изменениями.
          </p>

          <h2>7. Реквизиты и контакты</h2>
          <ul>
            <li>Организация: {CONTACTS.company}</li>

            <li>Адрес: {CONTACTS.address}</li>
            <li>
              Email:{" "}
              <a href={`mailto:${CONTACTS.email}`} className="text-accent hover:underline">
                {CONTACTS.email}
              </a>
            </li>
            <li>
              Телефон:{" "}
              <a href={CONTACTS.phoneHref} className="text-accent hover:underline">
                {CONTACTS.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
