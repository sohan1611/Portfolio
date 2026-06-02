import { Section } from "../ui/Section";
import { GitCommit, BookOpen, ExternalLink } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  updated_at: string;
}

async function getGitHubData() {
  try {
    const username = "sohan1611"; // Hardcoded or moved to config
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`, { next: { revalidate: 3600 } })
    ]);

    if (!userRes.ok || !reposRes.ok) {
      console.error("GitHub API rate limit or error.");
      return null;
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    return { user, repos };
  } catch (error) {
    console.error("Failed to fetch GitHub data:", error);
    return null;
  }
}

export async function GitHubActivity() {
  const data = await getGitHubData();
  
  if (!data) {
    // Graceful degradation when API fails
    return (
      <Section id="github" className="border-t border-border">
        <div className="flex items-center gap-3 mb-6">
          <GitCommit className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">GitHub Profile</h2>
            <div className="h-1 w-12 bg-primary rounded mt-2"></div>
          </div>
        </div>
        <div className="p-6 rounded-xl bg-card border border-border text-center">
          <p className="text-muted-foreground mb-4">View my full open-source portfolio and recent activity directly on GitHub.</p>
          <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
            Visit @sohan1611 <ExternalLink className="ml-1 h-3.5 w-3.5" />
          </a>
        </div>
      </Section>
    );
  }

  return (
    <Section id="github" className="border-t border-border">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <GitCommit className="h-8 w-8 text-primary" />
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">GitHub Activity</h2>
              <div className="h-1 w-12 bg-primary rounded mt-2"></div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg border border-border">
            <span className="text-sm font-medium text-foreground">{data.user.public_repos}</span>
            <span className="text-sm text-muted-foreground">Public Repositories</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">Recent Repositories</h3>
            <a href={data.user.html_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline hidden sm:flex items-center">
              View Profile <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.repos.map((repo: GitHubRepo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <h4 className="font-semibold text-foreground truncate">{repo.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                  {repo.description || "No description provided."}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-primary/70"></span>
                      {repo.language}
                    </span>
                  )}
                  <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
              </a>
            ))}
          </div>
          <a href={data.user.html_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex sm:hidden items-center mt-4">
            View full profile on GitHub <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </div>
    </Section>
  );
}
