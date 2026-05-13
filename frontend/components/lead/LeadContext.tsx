"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface LeadContextValue {
  isOpen: boolean;
  openModal: (source?: string) => void;
  closeModal: () => void;
  source: string;
}

const LeadContext = createContext<LeadContextValue | null>(null);

export function LeadProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("hero");

  const openModal = useCallback((src = "hero") => {
    setSource(src);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <LeadContext.Provider value={{ isOpen, openModal, closeModal, source }}>
      {children}
    </LeadContext.Provider>
  );
}

export function useLeadModal() {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error("useLeadModal must be used inside LeadProvider");
  return ctx;
}
