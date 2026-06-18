import About from "@/components/about/About";
import { Hero } from "@/components/hero";
import Menu from '@/components/menu';
import Gallery from '@/components/gallery';
import Contact from '@/components/contact';



export default function Home() {
  return (
    <>
      <Hero />

      <About />

      <Menu />

      <Gallery />


     <Contact/>
       
    </>
  );
}