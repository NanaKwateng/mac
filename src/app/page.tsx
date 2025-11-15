import Laptop from "@/components/ux/3DLaptop";
import Hero from "@/components/ux/Hero";
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      <Hero />
      <Laptop />
    </section >
  );
}
