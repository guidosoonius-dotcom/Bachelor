import GradientCard from "@/components/GradientCard";
import { PRACTICAL_INFO } from "@/lib/content";

export default function InfoPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Praktische informatie</h1>
      <div className="flex flex-col gap-3">
        {PRACTICAL_INFO.map((item) => (
          <GradientCard key={item.label}>
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-primary">
              {item.label}
            </p>
            <p className="text-sm">{item.value}</p>
          </GradientCard>
        ))}
      </div>
    </div>
  );
}
