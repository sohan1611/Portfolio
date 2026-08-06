import { Suspense } from "react";
import { Section } from "../ui/Section";
import { GitCommit, BookOpen, ExternalLink } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { Reveal } from "../ui/Reveal";

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  updated_at: string;
}

const FALLBACK_DESCRIPTIONS: Record<string, string> = {
  "aspirova": "AI-powered opportunity almanac indexing internships, jobs, fellowships, and research programmes from across the web.",
  "portfolio": "Personal portfolio website showcasing projects, skills, certifications, and technical interests.",
  "reality-drift": "AI-powered life pattern simulator for habit analysis and behavioral forecasting.",
  "apex-intel": "Autonomous multi-agent due diligence platform for startup evaluation and investment analysis.",
  "sentineliq": "Institutional-grade financial forensics engine to detect potential fraud, inconsistencies, and governance risks.",
};

async function getGitHubData() {
  try {
    const username = "sohan1611";
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, { next: { revalidate: 3600 } })
    ]);

    if (!userRes.ok || !reposRes.ok) {
      console.error("GitHub API rate limit or error.");
      return null;
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    const preferredNames = ["aspirova", "apex-intel", "sentineliq", "reality-drift", "portfolio"];
    const filteredRepos = repos
      .filter((repo: GitHubRepo) =>
        preferredNames.includes(repo.name.toLowerCase())
      )
      .map((repo: GitHubRepo) => ({
        ...repo,
        description: repo.description?.trim() || FALLBACK_DESCRIPTIONS[repo.name.toLowerCase()] || "No description provided.",
      }));

    return { user, repos: filteredRepos };
  } catch (error) {
    console.error("Failed to fetch GitHub data:", error);
    return null;
  }
}

function GitHubSkeleton() {
  return (
    <Section id="github" className="border-t border-border">
      <div className="flex items-center gap-3 mb-6">
        <GitCommit className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight text-foreground">GitHub Activity</h2>
          <div className="h-1 w-12 bg-primary rounded mt-2"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-xl border border-border/50 dark:border-slate-800 bg-card animate-pulse">
            <div className="h-5 w-40 bg-muted rounded mb-3"></div>
            <div className="h-4 w-full bg-muted rounded mb-2"></div>
            <div className="h-4 w-2/3 bg-muted rounded mb-5"></div>
            <div className="h-3 w-24 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function GitHubFallback() {
  return (
    <Section id="github" className="border-t border-border">
      <Reveal>
        <div className="flex items-center gap-3 mb-6">
          <GitCommit className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">GitHub Profile</h2>
            <div className="h-1 w-12 bg-primary rounded mt-2"></div>
          </div>
        </div>
      </Reveal>
      <Reveal delay={50}>
        <div className="p-6 rounded-xl bg-card border border-border text-center">
          <p className="text-muted-foreground mb-4">View my full open-source portfolio and recent activity directly on GitHub.</p>
          <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-primary hover:underline transition-transform duration-200 hover:-translate-y-0.5">
            Visit @sohan1611 <ExternalLink className="ml-1 h-3.5 w-3.5" />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}

async function GitHubContent() {
  const data = await getGitHubData();

  if (!data) {
    return <GitHubFallback />;
  }

  return (
    <Section id="github" className="border-t border-border">
      <div className="space-y-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <GitCommit className="h-8 w-8 text-primary" />
              <div>
                <h2 className="text-3xl font-display font-bold tracking-tight text-foreground">GitHub Activity</h2>
                <div className="h-1 w-12 bg-primary rounded mt-2"></div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg border border-border">
              <span className="text-sm font-display font-medium text-foreground">{data.user.public_repos}</span>
              <span className="text-sm font-display text-muted-foreground">Public Repositories</span>
            </div>
          </div>
        </Reveal>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Reveal delay={50}>
              <h3 className="text-xl font-display font-semibold text-foreground">Recent Repositories</h3>
            </Reveal>
            <Reveal delay={50}>
              <a href={data.user.html_url} target="_blank" rel="noopener noreferrer" className="text-sm font-display text-primary hover:text-accent transition-all duration-200 hover:-translate-y-0.5 hidden sm:flex items-center">
                View Profile <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.repos.map((repo: GitHubRepo, index: number) => (
              <Reveal key={repo.id} delay={100 + index * 60}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 rounded-xl border border-border/50 dark:border-[#1E293B] glass-surface hover-glow transition-all duration-300 hover:-translate-y-0.5 group"
                >
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <h4 className="text-lg font-display font-semibold text-foreground truncate group-hover:text-primary transition-colors">{repo.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-5 h-10">
                  {repo.description || "No description provided."}
                </p>
                <div className="flex items-center gap-4 text-xs font-display text-muted-foreground opacity-80">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-primary/70"></span>
                      {repo.language}
                    </span>
                  )}
                  <span>Last Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <a href={data.user.html_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex sm:hidden items-center mt-4 transition-transform duration-200 hover:-translate-y-0.5">
              View full profile on GitHub <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

export function GitHubActivity() {
  return (
    <Suspense fallback={<GitHubSkeleton />}>
      <GitHubContent />
    </Suspense>
  );
}
