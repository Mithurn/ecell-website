import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { BackgroundPaths } from "../../components/ui/background-paths";
import { BentoGrid, BentoCard } from "../../components/ui/bento-grid";
import { AnimatedTestimonials } from "../../components/ui/animated-testimonials";
import { ContainerScroll } from "../../components/ui/container-scroll-animation";
import RadialOrbitalTimeline from "../../components/ui/radial-orbital-timeline";
import { Code, Palette, Rocket, TrendingUp, Zap, Users, Globe, Award } from "lucide-react";
import { motion } from "framer-motion";
import { TestimonialsV2 } from "../../components/ui/testimonial-v2";
import { TextTicker } from "../../components/ui/marquee";
import { StatsGrid } from "../../components/ui/stats-grid";
import { InitiativesCarousel } from "../../components/ui/initiatives-carousel";
import { DomainsShowcase } from "../../components/ui/domains-showcase";
import { TeamShowcase } from "../../components/ui/team-showcase";

const Landing = () => {
  const [selectedFeature, setSelectedFeature] = React.useState(null);

  // Data for Bento Grid - Uniform 2x3 layout
  const features = [
    {
      Icon: Rocket,
      name: "Startup Incubation",
      description: "We provide resources, mentorship, and workspace to help student startups take flight.",
      href: "/startups",
      cta: "Learn more",
      background: <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-black to-black opacity-50" />,
      className: "lg:col-span-1 lg:row-span-1",
    },
    {
      Icon: Users,
      name: "Mentorship",
      description: "Connect with industry leaders and alumni who guide you through your entrepreneurial journey.",
      href: "/team",
      cta: "Meet mentors",
      background: <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-black to-black opacity-50" />,
      className: "lg:col-span-1 lg:row-span-1",
    },
    {
      Icon: Globe,
      name: "Networking",
      description: "Join a vast network of 5000+ innovators, investors, and change-makers.",
      href: "/events",
      cta: "Join events",
      background: <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-black to-black opacity-50" />,
      className: "lg:col-span-1 lg:row-span-1",
    },
    {
      Icon: Award,
      name: "Competitions",
      description: "Win cash prizes and funding through our flagship hackathons and pitch competitions.",
      href: "/events",
      cta: "Compete now",
      background: <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-black to-black opacity-50" />,
      className: "lg:col-span-1 lg:row-span-1",
    },
    {
      Icon: Zap,
      name: "Skill Development",
      description: "Master the skills needed to build and scale successful ventures.",
      href: "/about",
      cta: "Explore skills",
      background: <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-black to-black opacity-50" />,
      className: "lg:col-span-1 lg:row-span-1",
    },
    {
      Icon: TrendingUp,
      name: "Funding Support",
      description: "Access seed funding, investor connections, and financial guidance for your venture.",
      href: "/startups",
      cta: "Get funded",
      background: <div className="absolute inset-0 bg-gradient-to-br from-lime-500/10 via-black to-black opacity-50" />,
      className: "lg:col-span-1 lg:row-span-1",
    },
  ];

  // Data for Radial Orbital Timeline (Domains)
  const domains = [
    {
      id: 1,
      title: "Technical",
      date: "Web & App",
      content: "Building innovative digital solutions through web development, app development, and software engineering.",
      category: "Technical",
      icon: Code,
      relatedIds: [2, 3],
      status: "completed",
      energy: 95,
    },
    {
      id: 2,
      title: "AI/ML",
      date: "Data Science",
      content: "Leveraging artificial intelligence and machine learning to solve real-world problems and drive innovation.",
      category: "Technical",
      icon: Rocket,
      relatedIds: [1, 4],
      status: "in-progress",
      energy: 85,
    },
    {
      id: 3,
      title: "Creatives",
      date: "Design & Media",
      content: "Creating stunning visual content, graphics, videos, and brand identities that captivate audiences.",
      category: "Creative",
      icon: Palette,
      relatedIds: [1, 4],
      status: "completed",
      energy: 90,
    },
    {
      id: 4,
      title: "Corporate",
      date: "Business Dev",
      content: "Building partnerships, securing sponsorships, and driving business growth through strategic relations.",
      category: "Business",
      icon: TrendingUp,
      relatedIds: [2, 3],
      status: "completed",
      energy: 88,
    },
  ];



  // Data for Core Team (using AnimatedTestimonials)
  const coreTeam = [
    {
      quote: "Leading E-Cell has been a journey of innovation and impact. We strive to build an ecosystem where every idea gets a chance to fly.",
      name: "Aryan Sharma",
      designation: "President",
      src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop",
    },
    {
      quote: "Our goal is to bridge the gap between technical skills and entrepreneurial mindset. The projects we've launched this year are proof of that.",
      name: "Sneha Patel",
      designation: "Vice President",
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop",
    },
    {
      quote: "Technology is the backbone of innovation. We've upgraded our entire tech stack to support the next generation of startups.",
      name: "Rohan Das",
      designation: "Technical Head",
      src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&h=500&fit=crop",
    },
    {
      quote: "Design is not just about looks; it's about problem-solving. Our creative team ensures every E-Cell initiative communicates effectively.",
      name: "Kavya Iyer",
      designation: "Creatives Head",
      src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=500&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <BackgroundPaths title="Entrepreneurship Cell SRMIST" />

      {/* Scrolling Ticker */}
      <TextTicker
        texts={["E-Cell SRMIST", "Innovate", "Build", "Scale", "Transform Ideas", "Launch Startups"]}
        className="bg-gradient-to-r from-black via-green-950/20 to-black"
      />

      {/* Container Scroll Section */}
      <section className="bg-black">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-white mb-8 font-display">
                Experience the Future of <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-green-500">
                  Entrepreneurship
                </span>
              </h1>
            </>
          }
        >
          <div className="flex items-center justify-center h-full bg-neutral-900 border-2 border-green-500/20 rounded-3xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&h=900&fit=crop"
              alt="E-Cell Event"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-10 left-10 z-20">
              <h3 className="text-4xl font-bold text-white mb-2 font-display">Innovate. Build. Scale.</h3>
              <p className="text-green-400 text-xl">Join the revolution.</p>
            </div>
          </div>
        </ContainerScroll>
      </section>

      {/* Stats Section */}
      <StatsGrid
        stats={[
          { value: "16", label: "Startups Incubated", suffix: "+" },
          { value: "50", label: "Events Conducted", suffix: "+" },
          { value: "5000", label: "Students Impacted", suffix: "+" },
          { value: "25", label: "Industry Partners", suffix: "+" },
        ]}
      />

      {/* What We Offer - Carousel */}
      <InitiativesCarousel
        initiatives={features.map((f, index) => ({
          id: index + 1,
          Icon: f.Icon,
          title: f.name,
          description: f.description,
          href: f.href,
        }))}
      />

      {/* Our Domains - Animated Showcase */}
      <DomainsShowcase />

      {/* Meet Our Core Team (Animated Testimonials) */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-white text-center mb-10 font-display"
          >
            Meet Our <span className="text-green-500">Core Team</span>
          </motion.h2>
          <AnimatedTestimonials testimonials={coreTeam} autoplay={true} />
        </div>
      </section>

      {/* What People Say (Vertical Scroll) */}
      <TestimonialsV2 />

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-t from-green-900/20 to-black relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-bold text-white mb-8 font-display"
          >
            Ready to <span className="text-green-500">Launch?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-neutral-300 mb-12 max-w-2xl mx-auto"
          >
            Join the most vibrant student entrepreneurship community in India.
          </motion.p>
          <Link to="/recruitments">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-12 py-6 bg-green-600 text-white text-xl font-bold rounded-full hover:bg-green-700 transition-all shadow-lg shadow-green-600/40 border-2 border-green-500"
            >
              Join E-Cell Now
            </motion.div>
          </Link>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black -z-10" />
      </section>

      <Footer />

      <AnimPresence selectedFeature={selectedFeature} setSelectedFeature={setSelectedFeature} />
    </div>
  );
};

const AnimPresence = ({ selectedFeature, setSelectedFeature }) => {
  return (
    <motion.AnimatePresence>
      {selectedFeature && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedFeature(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-neutral-950 border border-green-500/20 rounded-2xl p-8 shadow-2xl relative"
          >
            <button
              onClick={() => setSelectedFeature(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              ✕
            </button>
            <selectedFeature.Icon className="w-12 h-12 text-green-500 mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4 font-display">
              {selectedFeature.name}
            </h3>
            <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
              {selectedFeature.description}
            </p>
            <div className="bg-green-900/10 border border-green-500/10 rounded-xl p-6 mb-8">
              <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <Zap size={18} /> Why it matters
              </h4>
              <p className="text-neutral-400 text-sm">
                This initiative is designed to empower students with the resources, connections, and skills required to navigate the modern entrepreneurial landscape. From ideation to execution, we cover every step of the journey.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedFeature(null)}
                className="px-4 py-2 text-neutral-400 hover:text-white"
              >
                Close
              </button>
              <Link to={selectedFeature.href}>
                <button className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
                  {selectedFeature.cta} →
                </button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.AnimatePresence>
  );
}

export default Landing;
