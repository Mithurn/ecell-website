import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";

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
import { fetchTeamMembers } from "../../services/teamService";

const HeroTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-02-04T08:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col items-center"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl md:text-2xl font-bold font-display text-white tracking-widest uppercase">E-SUMMIT</span>
        <span className="text-xl md:text-2xl font-bold font-mono text-green-500">2026</span>
      </div>
      <div className="flex gap-4 text-xs md:text-sm font-mono text-neutral-400">
        <div className="flex flex-col items-center">
          <span className="text-lg md:text-xl text-white font-bold">{String(timeLeft.days).padStart(2, '0')}</span>
          <span>DAYS</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg md:text-xl text-white font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span>HRS</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg md:text-xl text-white font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span>MIN</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg md:text-xl text-white font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span>SEC</span>
        </div>
      </div>
    </motion.div>
  );
};

// Position quotes for Core Team testimonials
const POSITION_QUOTES = {
  'president': "Leading E-Cell has been a journey of innovation and impact. We strive to build an ecosystem where every idea gets a chance to fly.",
  'vice president': "Our goal is to bridge the gap between technical skills and entrepreneurial mindset. Together, we're shaping the future.",
  'head': "Leading my domain with passion and purpose. We're building something incredible for the E-Cell community.",
  'lead': "Driving innovation and mentoring the next generation of entrepreneurs. Every day brings new opportunities.",
  'syndicate': "Connecting ideas with execution. We're the bridge between vision and reality.",
  'default': "Proud to be part of E-Cell SRMIST, building the entrepreneurial ecosystem of tomorrow."
};

const getQuoteForPosition = (position) => {
  const pos = position?.toLowerCase() || '';
  if (pos.includes('president') && !pos.includes('vice')) return POSITION_QUOTES['president'];
  if (pos.includes('vice president')) return POSITION_QUOTES['vice president'];
  if (pos.includes('head')) return POSITION_QUOTES['head'];
  if (pos.includes('syndicate')) return POSITION_QUOTES['syndicate'];
  if (pos.includes('lead')) return POSITION_QUOTES['lead'];
  return POSITION_QUOTES['default'];
};

const Landing = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [coreTeam, setCoreTeam] = useState([]);

  // Fetch Core Team (President, VP, Heads, Leads)
  useEffect(() => {
    const loadCoreTeam = async () => {
      const allMembers = await fetchTeamMembers();

      // Filter for President, Vice President, Heads, Leads, Syndicates
      const corePositions = allMembers.filter(m => {
        const pos = m.position?.toLowerCase() || '';
        return pos.includes('president') ||
          pos.includes('head') ||
          pos.includes('lead') ||
          pos.includes('syndicate');
      });

      // Sort: President first, then VP, then Heads, then Leads
      const sorted = corePositions.sort((a, b) => {
        const getPriority = (pos) => {
          const p = pos?.toLowerCase() || '';
          if (p.includes('president') && !p.includes('vice')) return 1;
          if (p.includes('vice president')) return 2;
          if (p.includes('head')) return 3;
          if (p.includes('syndicate')) return 4;
          if (p.includes('lead')) return 5;
          return 6;
        };
        return getPriority(a.position) - getPriority(b.position);
      });

      // Transform to testimonials format
      const testimonials = sorted.map(member => ({
        quote: getQuoteForPosition(member.position),
        name: member.name,
        designation: member.position,
        src: member.photo,
      }));

      setCoreTeam(testimonials);
    };

    loadCoreTeam();
  }, []);

  // Festive Confetti Effect on Mount - CRAZY MODE
  useEffect(() => {
    const hasShownConfetti = sessionStorage.getItem("hasShownConfetti");
    if (hasShownConfetti) return;

    sessionStorage.setItem("hasShownConfetti", "true");

    const end = Date.now() + 3 * 1000;
    const colors = ["#22c55e", "#ffffff", "#000000", "#4ade80"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 100,
        origin: { x: 0 },
        colors: colors,
        zIndex: 9999,
        scalar: 1.2,
        drift: 0.5
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 100,
        origin: { x: 1 },
        colors: colors,
        zIndex: 9999,
        scalar: 1.2,
        drift: -0.5
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  // Data for Bento Grid - What We Offer
  const features = [
    {
      Icon: Rocket,
      name: "Startup Incubation",
      description: "We provide resources, mentorship, and workspace to help student startups take flight.",
      href: "/startups",
      cta: "Learn more",
    },
    {
      Icon: Users,
      name: "Mentorship",
      description: "Connect with industry leaders and alumni who guide you through your entrepreneurial journey.",
      href: "/team",
      cta: "Meet mentors",
    },
    {
      Icon: Globe,
      name: "Networking",
      description: "Join a vast network of 5000+ innovators, investors, and change-makers.",
      href: "/events",
      cta: "Join events",
    },
    {
      Icon: Award,
      name: "Competitions",
      description: "Win cash prizes and funding through our flagship hackathons and pitch competitions.",
      href: "/events",
      cta: "Compete now",
    },
    {
      Icon: Zap,
      name: "Skill Development",
      description: "Master the skills needed to build and scale successful ventures.",
      href: "/about",
      cta: "Explore skills",
    },
    {
      Icon: TrendingUp,
      name: "Funding Support",
      description: "Access seed funding, investor connections, and financial guidance for your venture.",
      href: "/startups",
      cta: "Get funded",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section with Small Timer */}
      <BackgroundPaths
        title="Entrepreneurship Cell SRMIST"
        topContent={<HeroTimer />}
      />

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
            Meet Our <span className="text-green-500">Board Members</span>
          </motion.h2>
          {coreTeam.length > 0 ? (
            <AnimatedTestimonials testimonials={coreTeam} autoplay={true} />
          ) : (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
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
