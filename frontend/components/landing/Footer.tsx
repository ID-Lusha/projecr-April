import { Bot, Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import { CONTACTS } from "@/lib/contacts";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/20 px-4 pt-12 pb-6">
      <div className="mx-auto max-w-5xl">

        {/* Top: brand + columns */}
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">

          {/* Brand block */}
          <div className="shrink-0 lg:w-64">
            <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
              <Bot className="h-5 w-5 text-accent" />
              AI Sales Platform
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Внедряем ИИ-системы продаж под ключ — от настройки трафика до
              интеграции с CRM и платёжными шлюзами.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={CONTACTS.phoneHref}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-accent hover:border-accent"
                aria-label="Позвонить"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={CONTACTS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-accent hover:border-accent"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href={CONTACTS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-accent hover:border-accent"
                aria-label="Telegram"
              >
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:flex-1">

            {/* Navigation */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Навигация
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Проблема", href: "/#problem" },
                  { label: "Демо", href: "/#demo" },
                  { label: "Как это работает", href: "/#architecture" },
                  { label: "Кейсы", href: "/#cases" },
                  { label: "Стоимость", href: "/#offer" },
                  { label: "FAQ", href: "/#faq" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Контакты
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href={CONTACTS.phoneHref}
                    className="flex items-start gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {CONTACTS.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACTS.email}`}
                    className="flex items-start gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {CONTACTS.email}
                  </a>
                </li>
                {CONTACTS.address && (
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{CONTACTS.address}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Company */}
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Компания
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{CONTACTS.company}</li>
              </ul>
              <div className="mt-4 space-y-2 text-sm">
                <Link href="/terms" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Условия использования
                </Link>
                <Link href="/privacy" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Политика конфиденциальности
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-border pt-5">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {CONTACTS.company}. Все права защищены.
          </p>
        </div>

      </div>
    </footer>
  );
}
