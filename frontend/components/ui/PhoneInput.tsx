"use client";

import { cn } from "@/lib/cn";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface Country {
  code: string;
  name: string;
  flag: string;
  dial: string;
  mask: string; // digits only template, e.g. "### ###-##-##"
}

export const COUNTRIES: Country[] = [
  // СНГ
  { code: "RU", name: "Россия",           flag: "🇷🇺", dial: "+7",    mask: "### ###-##-##" },
  { code: "KZ", name: "Казахстан",        flag: "🇰🇿", dial: "+7",    mask: "### ###-##-##" },
  { code: "UA", name: "Украина",          flag: "🇺🇦", dial: "+380",  mask: "## ###-##-##" },
  { code: "BY", name: "Беларусь",         flag: "🇧🇾", dial: "+375",  mask: "## ###-##-##" },
  { code: "UZ", name: "Узбекистан",       flag: "🇺🇿", dial: "+998",  mask: "## ###-##-##" },
  { code: "AZ", name: "Азербайджан",      flag: "🇦🇿", dial: "+994",  mask: "## ###-##-##" },
  { code: "GE", name: "Грузия",           flag: "🇬🇪", dial: "+995",  mask: "### ##-##-##" },
  { code: "AM", name: "Армения",          flag: "🇦🇲", dial: "+374",  mask: "## ##-##-##" },
  { code: "KG", name: "Кыргызстан",       flag: "🇰🇬", dial: "+996",  mask: "### ###-###" },
  { code: "TJ", name: "Таджикистан",      flag: "🇹🇯", dial: "+992",  mask: "## ###-##-##" },
  { code: "TM", name: "Туркменистан",     flag: "🇹🇲", dial: "+993",  mask: "## ##-##-##" },
  { code: "MD", name: "Молдова",          flag: "🇲🇩", dial: "+373",  mask: "## ##-##-##" },
  // Европа
  { code: "DE", name: "Германия",         flag: "🇩🇪", dial: "+49",   mask: "#### #######" },
  { code: "FR", name: "Франция",          flag: "🇫🇷", dial: "+33",   mask: "# ## ## ## ##" },
  { code: "GB", name: "Великобритания",   flag: "🇬🇧", dial: "+44",   mask: "#### ######" },
  { code: "IT", name: "Италия",           flag: "🇮🇹", dial: "+39",   mask: "### ### ####" },
  { code: "ES", name: "Испания",          flag: "🇪🇸", dial: "+34",   mask: "### ### ###" },
  { code: "PL", name: "Польша",           flag: "🇵🇱", dial: "+48",   mask: "### ### ###" },
  { code: "NL", name: "Нидерланды",       flag: "🇳🇱", dial: "+31",   mask: "# ########" },
  { code: "BE", name: "Бельгия",          flag: "🇧🇪", dial: "+32",   mask: "### ## ## ##" },
  { code: "CH", name: "Швейцария",        flag: "🇨🇭", dial: "+41",   mask: "## ### ## ##" },
  { code: "AT", name: "Австрия",          flag: "🇦🇹", dial: "+43",   mask: "### ######" },
  { code: "SE", name: "Швеция",           flag: "🇸🇪", dial: "+46",   mask: "##-### ## ##" },
  { code: "NO", name: "Норвегия",         flag: "🇳🇴", dial: "+47",   mask: "### ## ###" },
  { code: "DK", name: "Дания",            flag: "🇩🇰", dial: "+45",   mask: "## ## ## ##" },
  { code: "FI", name: "Финляндия",        flag: "🇫🇮", dial: "+358",  mask: "## ### ####" },
  { code: "PT", name: "Португалия",       flag: "🇵🇹", dial: "+351",  mask: "### ### ###" },
  { code: "GR", name: "Греция",           flag: "🇬🇷", dial: "+30",   mask: "### ### ####" },
  { code: "CZ", name: "Чехия",            flag: "🇨🇿", dial: "+420",  mask: "### ### ###" },
  { code: "SK", name: "Словакия",         flag: "🇸🇰", dial: "+421",  mask: "### ### ###" },
  { code: "HU", name: "Венгрия",          flag: "🇭🇺", dial: "+36",   mask: "## ### ####" },
  { code: "RO", name: "Румыния",          flag: "🇷🇴", dial: "+40",   mask: "### ### ###" },
  { code: "BG", name: "Болгария",         flag: "🇧🇬", dial: "+359",  mask: "## ### ####" },
  { code: "HR", name: "Хорватия",         flag: "🇭🇷", dial: "+385",  mask: "## ### ####" },
  { code: "RS", name: "Сербия",           flag: "🇷🇸", dial: "+381",  mask: "## ### ####" },
  { code: "LT", name: "Литва",            flag: "🇱🇹", dial: "+370",  mask: "### #####" },
  { code: "LV", name: "Латвия",           flag: "🇱🇻", dial: "+371",  mask: "## ### ###" },
  { code: "EE", name: "Эстония",          flag: "🇪🇪", dial: "+372",  mask: "#### ####" },
  // Америка
  { code: "US", name: "США",              flag: "🇺🇸", dial: "+1",    mask: "### ###-####" },
  { code: "CA", name: "Канада",           flag: "🇨🇦", dial: "+1",    mask: "### ###-####" },
  { code: "MX", name: "Мексика",          flag: "🇲🇽", dial: "+52",   mask: "### ### ####" },
  { code: "BR", name: "Бразилия",         flag: "🇧🇷", dial: "+55",   mask: "## #####-####" },
  { code: "AR", name: "Аргентина",        flag: "🇦🇷", dial: "+54",   mask: "### ###-####" },
  { code: "CL", name: "Чили",             flag: "🇨🇱", dial: "+56",   mask: "# #### ####" },
  { code: "CO", name: "Колумбия",         flag: "🇨🇴", dial: "+57",   mask: "### ### ####" },
  // Ближний Восток
  { code: "AE", name: "ОАЭ",              flag: "🇦🇪", dial: "+971",  mask: "## ###-####" },
  { code: "SA", name: "Саудовская Аравия",flag: "🇸🇦", dial: "+966",  mask: "## ### ####" },
  { code: "IL", name: "Израиль",          flag: "🇮🇱", dial: "+972",  mask: "##-###-####" },
  { code: "TR", name: "Турция",           flag: "🇹🇷", dial: "+90",   mask: "### ###-##-##" },
  { code: "IR", name: "Иран",             flag: "🇮🇷", dial: "+98",   mask: "### ### ####" },
  { code: "IQ", name: "Ирак",             flag: "🇮🇶", dial: "+964",  mask: "### ### ####" },
  { code: "QA", name: "Катар",            flag: "🇶🇦", dial: "+974",  mask: "#### ####" },
  { code: "KW", name: "Кувейт",           flag: "🇰🇼", dial: "+965",  mask: "#### ####" },
  { code: "BH", name: "Бахрейн",          flag: "🇧🇭", dial: "+973",  mask: "#### ####" },
  { code: "OM", name: "Оман",             flag: "🇴🇲", dial: "+968",  mask: "#### ####" },
  { code: "JO", name: "Иордания",         flag: "🇯🇴", dial: "+962",  mask: "# #### ####" },
  { code: "LB", name: "Ливан",            flag: "🇱🇧", dial: "+961",  mask: "## ### ###" },
  // Азия
  { code: "CN", name: "Китай",            flag: "🇨🇳", dial: "+86",   mask: "### #### ####" },
  { code: "IN", name: "Индия",            flag: "🇮🇳", dial: "+91",   mask: "##### #####" },
  { code: "JP", name: "Япония",           flag: "🇯🇵", dial: "+81",   mask: "##-####-####" },
  { code: "KR", name: "Южная Корея",      flag: "🇰🇷", dial: "+82",   mask: "##-####-####" },
  { code: "SG", name: "Сингапур",         flag: "🇸🇬", dial: "+65",   mask: "#### ####" },
  { code: "TH", name: "Таиланд",          flag: "🇹🇭", dial: "+66",   mask: "##-###-####" },
  { code: "VN", name: "Вьетнам",          flag: "🇻🇳", dial: "+84",   mask: "### ### ####" },
  { code: "ID", name: "Индонезия",        flag: "🇮🇩", dial: "+62",   mask: "###-###-####" },
  { code: "MY", name: "Малайзия",         flag: "🇲🇾", dial: "+60",   mask: "##-#### ####" },
  { code: "PH", name: "Филиппины",        flag: "🇵🇭", dial: "+63",   mask: "### ### ####" },
  { code: "PK", name: "Пакистан",         flag: "🇵🇰", dial: "+92",   mask: "### #######" },
  { code: "BD", name: "Бангладеш",        flag: "🇧🇩", dial: "+880",  mask: "####-######" },
  { code: "NP", name: "Непал",            flag: "🇳🇵", dial: "+977",  mask: "##-#######" },
  { code: "LK", name: "Шри-Ланка",        flag: "🇱🇰", dial: "+94",   mask: "##-### ####" },
  { code: "MM", name: "Мьянма",           flag: "🇲🇲", dial: "+95",   mask: "## ### ####" },
  { code: "KH", name: "Камбоджа",         flag: "🇰🇭", dial: "+855",  mask: "##-### ###" },
  { code: "MN", name: "Монголия",         flag: "🇲🇳", dial: "+976",  mask: "#### ####" },
  // Африка
  { code: "ZA", name: "ЮАР",              flag: "🇿🇦", dial: "+27",   mask: "##-###-####" },
  { code: "NG", name: "Нигерия",          flag: "🇳🇬", dial: "+234",  mask: "### ### ####" },
  { code: "EG", name: "Египет",           flag: "🇪🇬", dial: "+20",   mask: "### ### ####" },
  { code: "KE", name: "Кения",            flag: "🇰🇪", dial: "+254",  mask: "### ######" },
  { code: "ET", name: "Эфиопия",          flag: "🇪🇹", dial: "+251",  mask: "##-###-####" },
  { code: "GH", name: "Гана",             flag: "🇬🇭", dial: "+233",  mask: "##-###-####" },
  { code: "TZ", name: "Танзания",         flag: "🇹🇿", dial: "+255",  mask: "### ### ###" },
  { code: "MA", name: "Марокко",          flag: "🇲🇦", dial: "+212",  mask: "##-######" },
  { code: "DZ", name: "Алжир",            flag: "🇩🇿", dial: "+213",  mask: "###-##-##-##" },
  { code: "TN", name: "Тунис",            flag: "🇹🇳", dial: "+216",  mask: "##-###-###" },
  // Океания
  { code: "AU", name: "Австралия",        flag: "🇦🇺", dial: "+61",   mask: "### ### ###" },
  { code: "NZ", name: "Новая Зеландия",   flag: "🇳🇿", dial: "+64",   mask: "##-###-####" },
];

function applyMask(digits: string, mask: string): string {
  let result = "";
  let di = 0;
  for (let i = 0; i < mask.length && di < digits.length; i++) {
    if (mask[i] === "#") {
      result += digits[di++];
    } else {
      // only append separator if we've already started typing
      if (di > 0) result += mask[i];
    }
  }
  return result;
}

function stripToDigits(value: string): string {
  return value.replace(/\D/g, "");
}

function maxDigits(mask: string): number {
  return mask.split("").filter((c) => c === "#").length;
}

interface PhoneInputProps {
  value: string;
  onChange: (fullPhone: string) => void;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  required?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export function PhoneInput({
  value,
  onChange,
  className,
  inputClassName,
  required,
  inputRef,
}: PhoneInputProps) {
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [inputVal, setInputVal] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync external reset (e.g. form clear)
  useEffect(() => {
    if (!value) {
      setInputVal("");
    }
  }, [value]);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleCountrySelect(c: Country) {
    setCountry(c);
    setOpen(false);
    setSearch("");
    // re-apply mask for new country
    const digits = stripToDigits(inputVal);
    const masked = applyMask(digits.slice(0, maxDigits(c.mask)), c.mask);
    setInputVal(masked);
    onChange(masked ? `${c.dial} ${masked}` : "");
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const digits = stripToDigits(raw);
    const limited = digits.slice(0, maxDigits(country.mask));
    const masked = applyMask(limited, country.mask);
    setInputVal(masked);
    onChange(masked ? `${country.dial} ${masked}` : "");
  }

  const filtered = search
    ? COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.dial.includes(search)
      )
    : COUNTRIES;

  const placeholder = applyMask(
    "#".repeat(maxDigits(country.mask)),
    country.mask
  ).replace(/#/g, "_");

  return (
    <div className={cn("flex gap-2", className)}>
      {/* Country selector */}
      <div className="relative shrink-0" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex h-full min-h-[44px] items-center gap-1.5 rounded-md border border-border bg-muted px-2.5",
            "text-sm font-medium text-foreground",
            "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
            "transition-colors hover:bg-muted/70 whitespace-nowrap"
          )}
        >
          <span className="text-base leading-none">{country.flag}</span>
          <span className="text-xs text-muted-foreground">{country.dial}</span>
          <ChevronDown
            className={cn(
              "h-3 w-3 text-muted-foreground transition-transform",
              open && "rotate-180"
            )}
          />
        </button>

        {open && (
          <div className="absolute left-0 top-full z-50 mt-1 w-56 rounded-md border border-border bg-background shadow-lg">
            <div className="p-2">
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск..."
                className={cn(
                  "w-full rounded-md border border-border bg-muted px-3 py-1.5 text-sm",
                  "focus:outline-none focus:ring-1 focus:ring-accent/50"
                )}
              />
            </div>
            <ul className="max-h-52 overflow-y-auto py-1">
              {filtered.map((c) => (
                <li key={c.code}>
                  <button
                    type="button"
                    onClick={() => handleCountrySelect(c)}
                    className={cn(
                      "flex w-full items-center gap-2.5 px-3 py-2 text-sm text-left",
                      "hover:bg-muted transition-colors",
                      country.code === c.code && "bg-accent/10 text-accent font-medium"
                    )}
                  >
                    <span className="text-base leading-none">{c.flag}</span>
                    <span className="flex-1 truncate">{c.name}</span>
                    <span className="text-xs text-muted-foreground">{c.dial}</span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="px-3 py-2 text-sm text-muted-foreground">Не найдено</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Phone number input */}
      <input
        ref={inputRef}
        type="tel"
        required={required}
        value={inputVal}
        onChange={handleInput}
        placeholder={placeholder}
        className={cn(
          "flex-1 rounded-md border border-border bg-muted px-3 py-2.5 min-h-[44px]",
          "text-base placeholder:text-muted-foreground font-mono",
          "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
          inputClassName
        )}
      />
    </div>
  );
}
