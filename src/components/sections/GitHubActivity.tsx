import { Section } from "../ui/Section";
import { GitCommit, BookOpen, ExternalLink } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  updated_at: string;
}

// How many of the most recently updated repositories to surface.
const RECENT_REPO_COUNT = 4;

// The portfolio's own repository would otherwise dominate this list as it is worked on most often.
const EXCLUDED_REPOS = ["portfolio"];

// Only used when a repository has no description set on GitHub.
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
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=${RECENT_REPO_COUNT + EXCLUDED_REPOS.length}`, { next: { revalidate: 3600 } })
    ]);

    if (!userRes.ok || !reposRes.ok) {
      console.error("GitHub API rate limit or error.");
      return null;
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    // The API already returns these sorted by most recently updated, so the
    // section stays current on its own as repositories are pushed to.
    const recentRepos = repos
      .filter((repo: GitHubRepo) => !EXCLUDED_REPOS.includes(repo.name.toLowerCase()))
      .slice(0, RECENT_REPO_COUNT)
      .map((repo: GitHubRepo) => ({
        ...repo,
        description: repo.description?.trim() || FALLBACK_DESCRIPTIONS[repo.name.toLowerCase()] || "No description provided.",
      }));

    return { user, repos: recentRepos };
  } catch (error) {
    console.error("Failed to fetch GitHub data:", error);
    return null;
  }
}

function GitHubFallback() {
  return (
    <Section id="github" className="border-t border-border">
      <Reveal>
        <div className="flex items-center gap-3 mb-6">
          <GitCommit className="h-8 w-8 text-primary" />
          <SectionHeading>GitHub Profile</SectionHeading>
        </div>
      </Reveal>
      <Reveal delay={50}>
        <div className="p-6 rounded-xl bg-card border border-border text-center">
          <p className="text-muted-foreground mb-4">View my full open-source portfolio and recent activity directly on GitHub.</p>
          <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded text-sm font-medium text-primary hover:underline transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            Visit @sohan1611 <ExternalLink className="ml-1 h-3.5 w-3.5" />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}

// Rendered directly rather than behind <Suspense>. The page is statically
// prerendered with an hourly revalidate, so the data is already resolved at
// build time and a streaming boundary only risks the fallback being left in
// place if the client-side reveal never runs.
export async function GitHubActivity() {
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
              <SectionHeading>GitHub Activity</SectionHeading>
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
              <a href={data.user.html_url} target="_blank" rel="noopener noreferrer" className="rounded text-sm font-display text-primary hover:text-accent transition-all duration-200 hover:-translate-y-0.5 hidden sm:flex items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                View Profile <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.repos.map((repo: GitHubRepo, index: number) => {
              const description = repo.description || "No description provided.";

              return (
                <Reveal key={repo.id} delay={100 + index * 60}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 rounded-xl border border-border/50 dark:border-[#1E293B] glass-surface hover-glow transition-all duration-300 hover:-translate-y-0.5 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <h4 className="text-lg font-display font-semibold text-foreground truncate group-hover:text-primary transition-colors">{repo.name}</h4>
                  </div>
                  <p
                    title={description}
                    className="text-sm text-muted-foreground line-clamp-none mb-5 h-auto md:line-clamp-2 md:h-10"
                  >
                    {description}
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
              );
            })}
          </div>
          <Reveal delay={200}>
              <a href={data.user.html_url} target="_blank" rel="noopener noreferrer" className="rounded text-sm text-primary hover:underline flex sm:hidden items-center mt-4 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              View full profile on GitHub <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
