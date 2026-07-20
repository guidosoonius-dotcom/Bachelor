import { Fragment, ReactNode } from "react";
import { MapPin, Sandwich, ParkingCircle, Backpack, Car, Phone, Wallet, Info as InfoIcon, LucideIcon } from "lucide-react";
import GradientCard from "@/components/GradientCard";
import NameEditButton from "@/components/NameEditButton";
import { PRACTICAL_INFO } from "@/lib/content";

const PHONE_REGEX = /\+31 6(?: \d{2}){4}/g;

const ICONS: Record<string, LucideIcon> = {
  "Verzamelplek & tijd": MapPin,
  Lunch: Sandwich,
  "Adressen & parkeren": ParkingCircle,
  "Wat neem je mee?": Backpack,
  Vervoer: Car,
  Contactpersoon: Phone,
  Kosten: Wallet,
};

function linkifyPhoneNumbers(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = PHONE_REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const phone = match[0];
    parts.push(
      <a
        key={match.index}
        href={`tel:${phone.replace(/\s+/g, "")}`}
        className="font-semibold text-primary underline"
      >
        {phone}
      </a>
    );
    lastIndex = match.index + phone.length;
  }
  parts.push(text.slice(lastIndex));

  return <>{parts.map((part, i) => <Fragment key={i}>{part}</Fragment>)}</>;
}

export default function InfoPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="heading-script text-4xl">Praktische informatie</h1>
        <NameEditButton />
      </div>
      <div className="flex flex-col gap-3">
        {PRACTICAL_INFO.map((item) => {
          const Icon = ICONS[item.label] ?? InfoIcon;
          return (
            <GradientCard key={item.label} className="flex gap-3">
              <span className="info-icon-circle">
                <Icon size={18} />
              </span>
              <div className="flex-1">
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-primary">
                  {item.label}
                </p>
                <p className="text-sm">{linkifyPhoneNumbers(item.value)}</p>
                {item.details && (
                  <dl className="mt-2 flex flex-col divide-y divide-secondary">
                    {item.details.map((detail) => (
                      <div key={detail.label} className="flex items-baseline justify-between gap-3 py-2">
                        <dt className="shrink-0 text-xs font-bold text-muted">{detail.label}</dt>
                        <dd className="text-right text-sm">{detail.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-subtle transition-transform active:scale-95"
                  >
                    Open Tikkie Groepie
                  </a>
                )}
              </div>
            </GradientCard>
          );
        })}
      </div>
    </div>
  );
}
