import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "As Coordinator of E-Cell SRMIST, I’m proud to be part of a creative and innovation-driven community. With 22+ years in computing, I’m passionate about mentoring students and helping them grow as future leaders and innovators. Excited to support our talented team.",
      name: "Dr. Dorathi Jayaseeli J D",
      designation: "Faculty Incharge, E-Cell SRMIST",
      src: "https://res.cloudinary.com/dsxpqhyrv/image/upload/v1737904694/Dorathi_d8igo6.jpg",
    },
    {
      quote:
        "Who wouldn’t want to be part of a community where even your wildest ideas are taken seriously? Since my freshman year, I knew I wanted to be here and E-Cell SRMIST has become exactly that place for innovation.",
      name: "Mayank Rai",
      designation: "Founder, E-Cell SRMIST",
      src: "https://res.cloudinary.com/dsxpqhyrv/image/upload/v1737904545/1626018089613_mupguf.jpg",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
