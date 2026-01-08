import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { MemberGrid } from '../../components/ui/member-grid';
import { AnimatedTeamSection } from '../../components/ui/team-section';
import { Button } from '../../components/ui/button';

const TeamMemberCard = ({ member, size = "md" }) => {
  const isLarge = size === "lg";
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative group bg-neutral-900 border border-green-500/20 rounded-2xl overflow-hidden 
        ${isLarge ? 'max-w-md w-full' : 'w-full'}
        hover:border-green-500/60 transition-all duration-300
        shadow-[0_0_15px_rgba(34,197,94,0.05)] hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]`}
    >
      {/* Neon glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-5" />

      <div className={`relative ${isLarge ? 'h-96' : 'h-80'} overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black via-black/90 to-transparent pt-20">
        <h3 className={`${isLarge ? 'text-3xl' : 'text-xl'} font-bold text-white mb-1 font-display`}>{member.name}</h3>
        <p className="text-green-400 font-medium mb-4">{member.role}</p>
        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <a href="#" className="p-2 rounded-full bg-white/10 text-white hover:bg-green-500 hover:text-black transition-all duration-200">
            <Linkedin size={18} />
          </a>
          <a href="#" className="p-2 rounded-full bg-white/10 text-white hover:bg-green-500 hover:text-black transition-all duration-200">
            <Mail size={18} />
          </a>
          <a href="#" className="p-2 rounded-full bg-white/10 text-white hover:bg-green-500 hover:text-black transition-all duration-200">
            <Instagram size={18} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const DomainSection = ({ domain }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-24"
    >
      <h3 className="text-4xl font-bold text-white mb-12 border-l-4 border-green-500 pl-6 font-display">
        {domain.name} <span className="text-green-500">Domain</span>
      </h3>

      {/* Heads */}
      <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
        <TeamMemberCard member={domain.head} />
        {domain.associate && <TeamMemberCard member={domain.associate} />}
      </div>

      {/* Members */}
      <div className="bg-neutral-900/50 border border-green-500/10 rounded-2xl p-8 backdrop-blur-sm">
        <h4 className="text-xl font-bold text-green-400 mb-6 font-display text-center">Team Members</h4>
        <MemberGrid members={domain.members} />
      </div>
    </motion.div>
  );
};

const Team = () => {
  const [activeTab, setActiveTab] = useState("faculty"); // 'faculty', 'core', 'domains'
  const [activeDomain, setActiveDomain] = useState("Technical");

  const faculty = {
    name: "Dr. P. Supriya",
    role: "Faculty Incharge",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop"
  };

  const founder = {
    name: "Siddharth Gupta",
    role: "Founder",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=500&fit=crop"
  };

  const coreTeam = [
    {
      name: "Aryan Sharma",
      role: "President",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop"
    },
    {
      name: "Sneha Patel",
      role: "Vice President",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop"
    }
  ];



  const domains = [
    {
      name: "Technical",
      head: { name: "Rohan Das", role: "Technical Head", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&h=500&fit=crop" },
      associate: { name: "Amit Verma", role: "Associate Lead", image: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=500&h=500&fit=crop" },
      members: [
        { name: "Rahul Kumar", role: "Full Stack Dev" },
        { name: "Priya Singh", role: "Frontend Dev" },
        { name: "Aditya Raj", role: "UI/UX Designer" },
        { name: "Meera Nair", role: "Backend Dev" },
        { name: "Karthik S", role: "DevOps Engineer" },
        { name: "Neha Gupta", role: "App Developer" },
        { name: "Vikram Malhotra", role: "Web Developer" },
        { name: "Sarah Jenkins", role: "QA Engineer" },
        { name: "David Chen", role: "System Admin" }
      ]
    },
    {
      name: "Creatives",
      head: { name: "Kavya Iyer", role: "Creative Head", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=500&fit=crop" },
      associate: { name: "Riya Sharma", role: "Associate Lead", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop" },
      members: [
        { name: "Ananya Desai", role: "Graphic Designer" },
        { name: "Arjun Reddy", role: "Video Editor" },
        { name: "Sofia Khan", role: "Illustrator" },
        { name: "Lucas Wright", role: "Content Creator" },
        { name: "Isabella Martinez", role: "Animator" },
        { name: "Oliver Wilson", role: "Photographer" },
        { name: "Emma Thompson", role: "Copywriter" }
      ]
    },
    {
      name: "Corporate",
      head: { name: "Vikram Malhotra", role: "Corporate Head", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop" },
      associate: { name: "Ishaan Kapoor", role: "Associate Lead", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop" },
      members: [
        { name: "Zainab Ali", role: "PR Manager" },
        { name: "Ryan Cooper", role: "Sponsorship Lead" },
        { name: "Nathan Drake", role: "Corporate Relations" },
        { name: "Elena Fisher", role: "Marketing Strategist" },
        { name: "Chloe Frazer", role: "Communications" },
        { name: "Samuel Drake", role: "Operations" }
      ]
    },
    {
      name: "Events",
      head: { name: "Anjali Gupta", role: "Events Head", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=500&fit=crop" },
      associate: { name: "Kabir Singh", role: "Associate Lead", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop" },
      members: [
        { name: "Tara Sutaria", role: "Event Coordinator" },
        { name: "Varun Dhawan", role: "Logistics Manager" },
        { name: "Kiara Advani", role: "Hospitality Lead" },
        { name: "Sidharth Malhotra", role: "Operations" },
        { name: "Alia Bhatt", role: "Stage Management" },
        { name: "Ranbir Kapoor", role: "Technical Support" }
      ]
    }
  ];

  // Hero Section Members (mix of leaders)
  const heroMembers = [
    { name: faculty.name, image: faculty.image },
    { name: founder.name, image: founder.image },
    ...coreTeam.map(m => ({ name: m.name, image: m.image })),
    { name: "Rohan Das", image: domains[0].head.image },
    { name: "Kavya Iyer", image: domains[1].head.image },
    { name: "Vikram Malhotra", image: domains[2].head.image },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Optional: Scroll to content section if needed
    if (tab !== 'domains') {
      const contentElement = document.getElementById('team-content');
      if (contentElement) {
        contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleDomainChange = (domainName) => {
    setActiveDomain(domainName);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <AnimatedTeamSection
        title="We are E-Cell SRMIST"
        description="A collective of innovators, leaders, and creators driving the future of entrepreneurship."
        members={heroMembers}
        className="min-h-[70vh] flex items-center justify-center bg-black py-20"
      />

      {/* Main Filter Tabs */}
      <div className="sticky top-20 z-30 bg-black/80 backdrop-blur-md border-y border-green-500/20 py-4 mb-8">
        <div className="container mx-auto px-4 flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: 'faculty', label: 'Faculty' },
              { id: 'core', label: 'Core Team' },
              { id: 'domains', label: 'Domains' },
            ].map((tab) => (
              <Button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                className={`rounded-full px-6 py-2 border-green-500/50 hover:bg-green-500 hover:text-black transition-all ${activeTab === tab.id
                  ? 'bg-green-500 text-black font-bold shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                  : 'bg-transparent text-white'
                  }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Secondary Domain Filter - Only visible when Domains is active */}
          <AnimatePresence>
            {activeTab === 'domains' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap justify-center gap-3 overflow-hidden"
              >
                {domains.map((domain) => (
                  <Button
                    key={domain.name}
                    onClick={() => handleDomainChange(domain.name)}
                    variant="ghost"
                    size="sm"
                    className={`rounded-full px-4 border border-green-500/30 ${activeDomain === domain.name
                      ? 'bg-green-500/20 text-green-400 border-green-500'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {domain.name}
                  </Button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div id="team-content" className="container mx-auto px-4 pb-32 min-h-[60vh]">
        <AnimatePresence mode="wait">
          {/* Faculty Section */}
          {(activeTab === 'faculty') && (
            <motion.section
              key="faculty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-32 flex flex-col items-center"
            >
              <h2 className="text-3xl font-bold mb-12 text-center font-['Space_Grotesk']">
                Faculty <span className="text-green-500">Incharge</span>
              </h2>
              <TeamMemberCard member={faculty} size="lg" />
            </motion.section>
          )}

          {/* Core Team Section */}
          {(activeTab === 'core') && (
            <motion.section
              key="core"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-32"
            >
              <h2 className="text-3xl font-bold mb-12 text-center font-['Space_Grotesk']">
                <span className="text-green-500">Core</span> Team
              </h2>

              <div className="flex justify-center mb-16">
                <div className="w-full max-w-md">
                  <TeamMemberCard member={founder} size="lg" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {coreTeam.map((member, index) => (
                  <TeamMemberCard key={index} member={member} />
                ))}
              </div>
            </motion.section>
          )}

          {/* Domains Section - Shows ONLY the active domain */}
          {(activeTab === 'domains') && (
            <motion.section
              key="domains"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {domains
                .filter(d => d.name === activeDomain)
                .map((domain, index) => (
                  <DomainSection key={index} domain={domain} />
                ))}
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
};

export default Team;
