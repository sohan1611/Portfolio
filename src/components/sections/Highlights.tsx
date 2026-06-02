import { portfolioData } from "@/data/portfolio";
import { Section } from "../ui/Section";

export function Highlights() {
  return (
    <Section id="highlights" className="pt-0 pb-16 md:pb-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {portfolioData.highlights.map((highlight, index) => (
          <div key={index} className="p-5 rounded-xl bg-card border border-border shadow-sm flex flex-col justify-center">
            <span className="text-sm font-medium text-muted-foreground mb-1">{highlight.title}</span>
            <span className="text-base font-semibold text-foreground">{highlight.value}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
