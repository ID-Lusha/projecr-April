"use client";

import { cn } from "@/lib/cn";
import { CONTACTS } from "@/lib/contacts";
import { useLeadModal } from "@/components/lead/LeadContext";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, Send, X, FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function FloatingContactButton() {
  const [open, setOpen] = useState(false);
  const { openModal } = useLeadModal();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const items = [
    {
      label: "Позвонить",
      icon: Phone,
      href: CONTACTS.phoneHref,
      external: false,
    },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      href: CONTACTS.whatsapp,
      external: true,
    },
    {
      label: "Telegram",
      icon: Send,
      href: CONTACTS.telegram,
      external: true,
    },
    {
      label: "Оставить заявку",
      icon: FileText,
      href: null,
      external: false,
    },
  ];

  return (
    <div
      ref={ref}
      className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-2 md:bottom-6"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col gap-2"
          >
            {items.map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-end gap-2"
              >
                <span className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium shadow-sm">
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-full",
                      "border border-border bg-background shadow-sm",
                      "text-muted-foreground transition-colors hover:text-accent hover:border-accent"
                    )}
                    aria-label={item.label}
                  >
                    <item.icon className="h-5 w-5" />
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      setOpen(false);
                      openModal("floating-button");
                    }}
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-full",
                      "bg-accent text-accent-foreground shadow-sm",
                      "transition-colors hover:bg-accent/90"
                    )}
                    aria-label={item.label}
                  >
                    <item.icon className="h-5 w-5" />
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full shadow-lg",
          "transition-all duration-200",
          open
            ? "bg-foreground text-background rotate-45"
            : "bg-accent text-accent-foreground hover:bg-accent/90"
        )}
        aria-label="Контакты"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}
