import type { Metadata } from "next";
import Link from "next/link";
import { CONTACTS } from "@/lib/contacts";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — AI Sales Platform",
  description: "Политика конфиденциальности и обработки персональных данных AI Sales Platform.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← На главную
        </Link>

        <h1 className="text-3xl font-bold tracking-tight">Политика конфиденциальности</h1>
        <p className="mt-2 text-sm text-muted-foreground">Последнее обновление: май 2026 г.</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">

          <p>
            Настоящая Политика описывает, какие персональные данные собирает{" "}
            <span className="font-medium text-foreground">{CONTACTS.company}</span>, как они
            используются и защищаются. Используя наш сайт, вы соглашаетесь с данной Политикой.
          </p>

          <h2>1. Какие данные мы собираем</h2>
          <p>Данные, которые вы предоставляете добровольно:</p>
          <ul>
            <li>Имя и контактный телефон (при заполнении формы заявки)</li>
            <li>Telegram-аккаунт (по желанию)</li>
            <li>Описание ниши вашего бизнеса</li>
            <li>Содержание диалогов с ИИ-ассистентом в демо-режиме</li>
          </ul>
          <p className="mt-3">
            Технические данные (IP-адрес, браузер, страницы просмотра) собираются
            автоматически для обеспечения работы сайта.
          </p>

          <h2>2. Цели обработки данных</h2>
          <ul>
            <li>Обратная связь по вашей заявке</li>
            <li>Подготовка индивидуального расчёта стоимости услуг</li>
            <li>Улучшение качества ИИ-ассистента и сервиса</li>
            <li>Информирование об услугах (с возможностью отписки)</li>
          </ul>

          <h2>3. Передача данных третьим лицам</h2>
          <p>
            Мы не продаём и не передаём персональные данные без вашего согласия, за исключением
            случаев, предусмотренных законодательством. Данные могут передаваться техническим
            партнёрам (хостинг, CRM) исключительно для оказания услуг и на условиях
            конфиденциальности.
          </p>

          <h2>4. Сроки хранения</h2>
          <ul>
            <li>Данные диалогов ИИ-чата — не более 90 дней</li>
            <li>Контактные данные заявок — до исполнения договора или отзыва согласия</li>
            <li>Технические логи — не более 30 дней</li>
          </ul>

          <h2>5. Ваши права</h2>
          <p>Вы вправе в любое время:</p>
          <ul>
            <li>Запросить копию своих персональных данных</li>
            <li>Потребовать исправления неточных данных</li>
            <li>Отозвать согласие на обработку данных</li>
            <li>Потребовать удаления своих данных</li>
          </ul>
          <p className="mt-3">
            Для реализации прав обращайтесь на{" "}
            <a href={`mailto:${CONTACTS.email}`} className="text-accent hover:underline">
              {CONTACTS.email}
            </a>
            . Запрос будет обработан в течение 10 рабочих дней.
          </p>

          <h2>6. Файлы cookie</h2>
          <p>
            Сайт использует только технические cookie для корректной работы (тема оформления,
            сессия). Рекламные и аналитические cookie не применяются.
          </p>

          <h2>7. Реквизиты оператора персональных данных</h2>
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
