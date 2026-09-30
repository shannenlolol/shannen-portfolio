import { useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePreviews from "./components/HomePreviews";
import useScrollReveal from "./hooks/useScrollReveal";
import Home from "./components/Home";
import Experiences from "./components/Experiences";
import ExperienceOverview from "./components/ExperienceOverview";
import ExperiencePage from "./components/ExperiencePage";
import Education from "./components/Education";
import SkillsPage from "./components/SkillsPage";
import Projects from "./components/Projects";
import ContactPage from "./components/ContactPage";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { experiences } from "./data/experiences";
import "./index.css";
function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const slug = path.startsWith("/experience/")
    ? path.slice("/experience/".length)
    : "";
  const home = path === "/";
  const skills = path === "/skills";
  const contact = path === "/contact";
  const education = path === "/education";
  const projects = path === "/projects";
  const experience = path === "/experience";
  useScrollReveal(home);
  useEffect(() => {
    const job = experiences.find((item) => item.slug === slug);
    document.title = home
      ? "Shannen Lee — Software Engineer"
      : experience
        ? "Experience — Shannen Lee"
        : projects
          ? "Projects — Shannen Lee"
          : education
            ? "Education — Shannen Lee"
            : contact
              ? "Contact — Shannen Lee"
              : skills
                ? "Skills — Shannen Lee"
                : job
                  ? `${job.company} — Shannen Lee`
                  : "Page not found — Shannen Lee";
  }, [slug, home, skills, contact, education, projects, experience]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      {home ? (
        <main id="main-content" className="home-page">
          <Home />
          <Experiences />
          <HomePreviews />
          <Contact />
        </main>
      ) : experience ? (
        <ExperienceOverview />
      ) : projects ? (
        <Projects />
      ) : education ? (
        <Education />
      ) : contact ? (
        <ContactPage />
      ) : skills ? (
        <SkillsPage />
      ) : (
        <ExperiencePage slug={slug} />
      )}
      <Footer />
    </>
  );
}
export default App;
