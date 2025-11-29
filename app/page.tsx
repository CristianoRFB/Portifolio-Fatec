import { PersonalProjectsSection } from './components/PersonalProjectsSection';
import { HeroSection } from "./components/HeroSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SkillsSection />
        <ProjectsSection />
        <PersonalProjectsSection />
      <ContactSection />
    </>
  );
}
