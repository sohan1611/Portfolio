import { portfolioData } from "@/data/portfolio";
import { Section } from "../ui/Section";

export function Highlights() {
  return (
    <Section id="highlights" className="pt-0 pb-16 md:pb-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {portfolioData.highlights.map((highlight, index) => (
          <div key={index} className="p-6 rounded-xl glass-surface flex flex-col justify-center transition-colors">
            <span className="text-sm font-display font-medium text-muted-foreground/80 mb-2">{highlight.title}</span>
            <span className={`text-base ${
              highlight.title === "Availability"
                ? "font-medium text-[#AFC4E5] tracking-[0.01em] leading-relaxed"
                : "font-display font-semibold text-foreground"
            }`}>
              {highlight.value}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
