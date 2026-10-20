import ScrollBar from "../components/ScrollBar";
import Backdrop from "../components/Backdrop";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { About, Skills, Projects, Education, Experience, Contact } from "../components/Sections";
import Footer from "../components/Footer";

export default function Page() {
  return (
    <>
      <ScrollBar />
      <Backdrop />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}