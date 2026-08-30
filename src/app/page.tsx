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

// The route's cache window is the minimum of this value and every fetch inside it.
// Declared explicitly so it does not depend on GitHubActivity's fetch options.
export const revalidate = 3600;

export default function Home() {
  return (
    <>
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
    </>
  );
}
