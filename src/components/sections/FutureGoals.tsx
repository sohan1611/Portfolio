import { portfolioData } from "@/data/portfolio";
import { Section } from "../ui/Section";
import { Target } from "lucide-react";

export function FutureGoals() {
  return (
    <Section id="goals" className="border-t border-border">
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <Target className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Future Goals</h2>
            <div className="h-1 w-12 bg-primary rounded mt-2"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolioData.futureGoals.map((goal, index) => (
            <div key={index} className="p-6 rounded-xl bg-card border border-border flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                0{index + 1}
              </span>
              <p className="text-foreground text-sm leading-relaxed pt-1">
                {goal}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
