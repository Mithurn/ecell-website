import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Instagram, Loader2, ChevronRight, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchTeamMembers, getDomains } from '../../services/teamService';

// Faculty Incharge data - easy to update photos later
const facultyData = {
  name: "Dr. P. Supriya",
  role: "Faculty Incharge",
  image: "", // Add photo URL here when available
  linkedin: "",
  email: "",
  instagram: ""
};

// Core Team positions to filter from sheets
const CORE_TEAM_POSITIONS = ['founder', 'president', 'vice president', 'secretary', 'treasurer', 'core'];
const LEADERSHIP_POSITIONS = ['head', 'lead', 'syndicate'];

// Reusable card component with size variants
const TeamCard = ({ member, variant = "default", className = "" }) => {
  const fallbackPhoto = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=400&background=22c55e&color=000&bold=true`;

  const sizeClasses = {
    large: "max-w-sm",
    default: "max-w-xs",
    compact: "max-w-[200px]"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden 
        ${sizeClasses[variant]} w-full flex flex-col items-center text-center pt-8 pb-6 mx-auto ${className}
        hover:border-green-500/40 transition-all duration-300`}
    >
      <div className={`relative ${variant === 'large' ? 'w-48 h-48' : variant === 'compact' ? 'w-24 h-24' : 'w-32 h-32'} rounded-full overflow-hidden border-4 border-neutral-800 group-hover:border-green-500/50 transition-colors duration-300 shadow-lg`}>
        <img
          src={member.image || member.photo || fallbackPhoto}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = fallbackPhoto; }}
        />
      </div>
      <div className="px-5 pt-4 w-full flex flex-col items-center">
        <h3 className={`font-bold text-white mb-1 ${variant === 'large' ? 'text-2xl' : 'text-xl'}`}>
          {member.name}
        </h3>
        <p className="text-green-400 font-medium text-sm mb-4">{member.role || member.position}</p>
        <div className="flex justify-center gap-3">
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-full bg-neutral-800 text-neutral-400 hover:bg-green-500 hover:text-black transition-all">
              <Linkedin size={18} />
            </a>
          )}
          {member.instagram && (
            <a href={member.instagram} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-full bg-neutral-800 text-neutral-400 hover:bg-green-500 hover:text-black transition-all">
              <Instagram size={18} />
            </a>
          )}
          {member.github && member.github !== 'NA' && (
            <a href={member.github} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-full bg-neutral-800 text-neutral-400 hover:bg-green-500 hover:text-black transition-all">
              <Github size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Compact member card for members section
const MemberCard = ({ member }) => {
  const fallbackPhoto = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=100&background=22c55e&color=000&bold=true`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -3 }}
      className="group text-center p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-green-500/30 transition-all"
    >
      <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-neutral-700 group-hover:border-green-500/50 transition-colors">
        <img
          src={member.photo || fallbackPhoto}
          alt={member.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = fallbackPhoto; }}
        />
      </div>
      <p className="text-white font-medium text-sm mb-1">{member.name}</p>
      <p className="text-neutral-500 text-xs">{member.position}</p>
      <div className="flex justify-center gap-2 mt-3">
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md bg-neutral-800 text-neutral-400 hover:bg-green-500 hover:text-black transition-all">
            <Linkedin size={14} />
          </a>
        )}
        {member.instagram && (
          <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md bg-neutral-800 text-neutral-400 hover:bg-green-500 hover:text-black transition-all">
            <Instagram size={14} />
          </a>
        )}
        {member.github && member.github !== 'NA' && (
          <a href={member.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md bg-neutral-800 text-neutral-400 hover:bg-green-500 hover:text-black transition-all">
            <Github size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
};

// Section header component
const SectionHeader = ({ id, title, subtitle }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="mb-10 scroll-mt-32 text-center md:text-left"
  >
    <h2 className="text-3xl font-bold text-white font-display">
      {title} <span className="text-green-500">{subtitle}</span>
    </h2>
    <div className="w-16 h-1 bg-green-500 mt-3 rounded-full mx-auto md:mx-0" />
  </motion.div>
);

const Team = () => {
  const [allMembers, setAllMembers] = useState([]);
  const [domains, setDomains] = useState([]);
  const [activeDomain, setActiveDomain] = useState("");
  const [activeSection, setActiveSection] = useState("faculty");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Scroll spy effect - improved detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['faculty', 'core', 'domains'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Check from bottom to top for better accuracy
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const offsetTop = element.offsetTop;
          if (scrollPosition >= offsetTop) {
            if (activeSection !== sections[i]) {
              setActiveSection(sections[i]);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  useEffect(() => {
    const loadTeamData = async () => {
      try {
        setLoading(true);
        const members = await fetchTeamMembers();
        const domainList = await getDomains();
        setAllMembers(members);
        setDomains(domainList);
        // Set first domain as default
        if (domainList.length > 0) {
          setActiveDomain(domainList[0]);
        }
      } catch (err) {
        console.error('Failed to load team data:', err);
        setError('Failed to load team members');
      } finally {
        setLoading(false);
      }
    };
    loadTeamData();
  }, []);

  // Filter helpers
  const getCoreTeam = () => allMembers.filter(m =>
    CORE_TEAM_POSITIONS.some(pos => m.position?.toLowerCase().includes(pos))
  );

  const getLeadersByDomain = (domain) => {
    const leaders = allMembers.filter(m =>
      m.domain === domain && LEADERSHIP_POSITIONS.some(pos => m.position?.toLowerCase().includes(pos))
    );

    // Sort priority: Head > Syndicate > Lead
    return leaders.sort((a, b) => {
      const getPriority = (position) => {
        const p = position?.toLowerCase() || '';
        if (p.includes('head')) return 1;
        if (p.includes('syndicate')) return 2;
        if (p.includes('lead')) return 3;
        return 4;
      };
      return getPriority(a.position) - getPriority(b.position);
    });
  };

  const getMembersByDomain = (domain) => allMembers.filter(m =>
    m.domain === domain && m.position?.toLowerCase() === 'member'
  );

  // Navigation sections
  const navSections = [
    { id: 'faculty', label: 'Faculty' },
    { id: 'core', label: 'Core Team' },
    { id: 'domains', label: 'Domains' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-500 animate-spin mx-auto mb-4" />
          <p className="text-neutral-400">Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Sticky Footer Navigation - Centered Pill with Sliding Indicator */}
      <nav className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-0.5 sm:gap-1 bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 rounded-full px-1.5 sm:px-2 py-1.5 sm:py-2 shadow-2xl">
          {navSections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                setActiveSection(section.id);
              }}
              className="relative px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-full whitespace-nowrap"
            >
              {/* Animated background for active state */}
              {activeSection === section.id && (
                <motion.div
                  layoutId="activeNavBg"
                  className="absolute inset-0 bg-green-500 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                />
              )}
              <span className={`relative z-10 transition-colors duration-150 ${activeSection === section.id ? 'text-black' : 'text-neutral-400 hover:text-white'
                }`}>
                {section.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 sm:pt-28 pb-36 sm:pb-32">

        {/* Faculty Section */}
        <section className="mb-20">
          <SectionHeader id="faculty" title="Faculty" subtitle="Incharge" />
          <div className="flex justify-start">
            <TeamCard member={facultyData} variant="large" className="md:mx-0" />
          </div>
        </section>

        {/* Core Team Section */}
        <section className="mb-20">
          <SectionHeader id="core" title="Core" subtitle="Team" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCoreTeam().map((member, idx) => (
              <TeamCard key={idx} member={member} variant="default" />
            ))}
          </div>
          {getCoreTeam().length === 0 && (
            <p className="text-neutral-500 text-center py-8">
              Add members with positions like "Founder", "President", etc. in the Google Sheet.
            </p>
          )}
        </section>

        {/* Domains Section with Inline Tabs */}
        <section className="mb-20" id="domains">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-10 scroll-mt-32"
          >
            {/* Domain Tabs Inline */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              {domains.map((domain, idx) => (
                <button
                  key={domain}
                  onClick={() => setActiveDomain(domain)}
                  className={`text-lg sm:text-2xl md:text-3xl font-bold font-display transition-all pb-2 border-b-2 ${activeDomain === domain
                    ? 'text-white border-green-500'
                    : 'text-neutral-600 hover:text-neutral-400 border-transparent'
                    }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Active Domain Content */}
          <AnimatePresence mode="wait">
            {activeDomain && (
              <motion.div
                key={activeDomain}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {/* Domain Leaders (Heads, Syndicate, Leads) */}
                {getLeadersByDomain(activeDomain).length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {getLeadersByDomain(activeDomain).map((member, idx) => (
                      <TeamCard key={idx} member={member} variant="default" />
                    ))}
                  </div>
                )}

                {/* Domain Members */}
                {getMembersByDomain(activeDomain).length > 0 && (
                  <div>
                    <h4 className="text-lg font-medium text-neutral-400 mb-4">Team Members</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {getMembersByDomain(activeDomain).map((member, idx) => (
                        <MemberCard key={idx} member={member} />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {error && (
          <div className="text-center text-red-400 py-20">
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* Floating Upload Photo Button - positioned above nav on mobile */}
      <Link
        to="/update-photo"
        className="fixed bottom-24 sm:bottom-6 right-4 sm:right-6 p-3 sm:px-5 sm:py-3 bg-green-500 text-black font-bold rounded-full shadow-lg hover:bg-green-400 transition-all hover:scale-105 z-40 flex items-center gap-2"
      >
        <Camera className="w-5 h-5" />
        <span className="hidden sm:inline">Update Photo</span>
      </Link>

      <Footer />
    </div>
  );
};

export default Team;
