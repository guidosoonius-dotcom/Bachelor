import GradientCard from "@/components/GradientCard";
import { PRACTICAL_INFO } from "@/lib/content";

export default function InfoPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Praktische informatie</h1>
      <div className="flex flex-col gap-3">
        {PRACTICAL_INFO.map((item) => (
          <GradientCard key={item.label}>
            <p className="text-xs font-medium gradient-text uppercase tracking-wide mb-1">
              {item.label}
            </p>
            <p className="text-sm">{item.value}</p>
          </GradientCard>
        ))}
      </div>
    </div>
  );
}
