"use client";

import { cn } from "@/lib/cn";
import { CONTACTS } from "@/lib/contacts";
import { useLeadModal } from "@/components/lead/LeadContext";
import { Phone, MessageCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";

export function StickyContactBar() {
  const [visible, setVisible] = useState(false);
  const { openModal } = useLeadModal();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Desktop bar — top under navbar */}
      <div className="hidden md:block fixed top-16 left-0 right-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-11 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-6 text-sm">
            <a
              href={CONTACTS.phoneHref}
              className="flex items-center gap-1.5 font-medium text-foreground hover:text-accent transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              {CONTACTS.phone}
            </a>
            <a
              href={CONTACTS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>
            <a
              href={CONTACTS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
              Telegram
            </a>
          </div>
          <button
            onClick={() => openModal("sticky-bar")}
            className="h-8 rounded-md bg-accent px-4 text-xs font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Оставить заявку
          </button>
        </div>
      </div>

      {/* Mobile bar — bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-1 p-2">
          <a
            href={CONTACTS.phoneHref}
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border",
              "text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            )}
            aria-label="Позвонить"
          >
            <Phone className="h-5 w-5" />
          </a>
          <a
            href={CONTACTS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border",
              "text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            )}
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
          <a
            href={CONTACTS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border",
              "text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            )}
            aria-label="Telegram"
          >
            <Send className="h-5 w-5" />
          </a>
          <button
            onClick={() => openModal("sticky-bar-mobile")}
            className="flex h-11 flex-1 items-center justify-center rounded-md bg-accent text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 active:scale-[0.98]"
          >
            Оставить заявку
          </button>
        </div>
      </div>
    </>
  );
}
