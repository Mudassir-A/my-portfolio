import Header from "../components/Header";
import Intro from "../components/Intro";
import {
  Summary,
  Skills,
  Experience,
  Education,
  Projects,
  Certifications,
  Contact,
} from "../components/Sections";
import Footer from "../components/Footer";

export default function Page() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Intro />
        <Summary />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
