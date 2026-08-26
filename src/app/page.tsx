import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { FutureGoals } from "@/components/sections/FutureGoals";
import { GitHubActivity } from "@/components/sections/GitHubActivity";
import { Projects } from "@/components/sections/Projects";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col items-center">
      <Hero />
      <Highlights />
      <About />
      <Education />
      <Skills />
      <FutureGoals />
      <GitHubActivity />
      <Projects />
      <Achievements />
      <Contact />
    </main>
  );
}
