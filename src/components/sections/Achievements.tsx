import { portfolioData } from "@/data/portfolio";
import { Section } from "../ui/Section";
import { Award, CheckCircle2, Clock } from "lucide-react";

export function Achievements() {
  return (
    <Section id="achievements" className="border-t border-border">
      <div className="max-w-3xl space-y-12">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Achievements & Certifications</h2>
          <div className="h-1 w-12 bg-primary rounded"></div>
        </div>

        <div className="relative border-l-2 border-border/50 ml-3 md:ml-4 space-y-8">
          {portfolioData.achievements.map((item, index) => (
            <div key={index} className="relative pl-8 md:pl-10">
              <div className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                <span className="inline-flex items-center text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full whitespace-nowrap">
                  {item.status === 'Completed' ? (
                    <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Clock className="mr-1.5 h-3.5 w-3.5 text-blue-500" />
                  )}
                  {item.status}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="h-4 w-4" />
                <span>{item.organization}</span>
                <span className="px-1.5">•</span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
