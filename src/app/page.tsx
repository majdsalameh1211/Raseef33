import About from "@/components/about/About";
import { Hero } from "@/components/hero";
import Menu from '@/components/menu'



export default function Home() {
  return (
    <>
      <Hero />

      <About />

      <Menu />

      <section
        id="gallery"
        style={{
          height: "100vh",
          background: "#0A0A08",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 32,
          fontWeight: 300,
          letterSpacing: "0.2em",
          color: "rgba(237,232,223,0.1)",
          textTransform: "uppercase",
        }}>
          Gallery
        </span>
      </section>

      <section
        id="contact"
        style={{
          height: "100vh",
          background: "#090907",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 32,
          fontWeight: 300,
          letterSpacing: "0.2em",
          color: "rgba(237,232,223,0.1)",
          textTransform: "uppercase",
        }}>
          Contact
        </span>
      </section>
    </>
  );
}