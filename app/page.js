import ScrollBar from "../components/ScrollBar";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { Projects, Education, Experience, Contact } from "../components/Sections";
import Footer from "../components/Footer";

export default function Page() {
  return (
    <>
      <ScrollBar />
      <Header />
      <main>
        <Hero />
        <Projects />
        <Education />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
