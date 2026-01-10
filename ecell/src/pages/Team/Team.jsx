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

// Board Members positions to filter from sheets
const BOARD_MEMBER_POSITIONS = ['founder', 'president', 'vice president', 'secretary', 'treasurer', 'core'];
const LEADERSHIP_POSITIONS = ['head', 'lead', 'syndicate'];

// Reusable card component with size variants - Optimized for scroll performance
const TeamCard = ({ member, variant = "default", className = "", onClick }) => {
  const fallbackPhoto = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=400&background=22c55e&color=000&bold=true`;

  const sizeClasses = {
    large: "max-w-sm",
    default: "max-w-xs",
    compact: "max-w-[200px]"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={onClick}
      className={`group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden cursor-pointer
        ${sizeClasses[variant]} w-full flex flex-col items-center text-center pt-8 pb-6 mx-auto ${className}
        hover:border-green-500/40 hover:-translate-y-1 transition-all duration-300`}
      style={{ willChange: 'opacity, transform' }}
    >
      <div className={`relative ${variant === 'large' ? 'w-48 h-48' : variant === 'compact' ? 'w-24 h-24' : 'w-32 h-32'} rounded-full overflow-hidden border-4 border-neutral-800 group-hover:border-green-500/50 transition-colors duration-300 shadow-lg`}>
        <img
          src={member.image || member.photo || fallbackPhoto}
          alt={member.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = fallbackPhoto; }}
          loading="lazy"
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

// Compact member card for members section - Optimized for scroll performance
const MemberCard = ({ member, onClick }) => {
  const fallbackPhoto = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=100&background=22c55e&color=000&bold=true`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onClick}
      className="group text-center p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-green-500/30 hover:-translate-y-1 transition-all cursor-pointer"
      style={{ willChange: 'opacity, transform' }}
    >
      <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-neutral-700 group-hover:border-green-500/50 transition-colors">
        <img
          src={member.photo || fallbackPhoto}
          alt={member.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = fallbackPhoto; }}
          loading="lazy"
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
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-10 scroll-mt-32 text-center"
  >
    <h2 className="text-3xl font-bold text-white font-display">
      {title} <span className="text-green-500">{subtitle}</span>
    </h2>
    <div className="w-16 h-1 bg-green-500 mt-3 rounded-full mx-auto" />
  </motion.div>
);

// Premium Profile Modal with E-LITE seal
const ProfileModal = ({ member, onClose }) => {
  if (!member) return null;

  const fallbackPhoto = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=400&background=22c55e&color=000&bold=true`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md"
      >
        {/* Premium Card */}
        <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border-2 border-green-500/50 rounded-3xl p-8 shadow-[0_0_60px_rgba(34,197,94,0.3)] overflow-hidden">

          {/* E-LITE Hexagon Seal Badge */}
          <div className="absolute top-4 right-4 z-20">
            <motion.div
              initial={{ rotate: -10, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="relative"
            >
              <div
                className="w-20 h-[70px] bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/30 overflow-hidden"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              >
                <div className="text-center relative z-10">
                  <div className="text-[9px] font-bold text-black/80 tracking-wider">I AM AN</div>
                  <div className="text-base font-black text-black tracking-tight leading-none">E-LITE</div>
                </div>
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                  style={{ width: '50%' }}
                />
              </div>
              {/* Hexagon border glow */}
              <div
                className="absolute inset-[-2px] bg-gradient-to-br from-yellow-300 to-amber-500 -z-10 blur-sm opacity-60"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              />
              {/* Pulsing glow effect */}
              <motion.div
                className="absolute inset-[-4px] bg-yellow-400/40 -z-20 blur-md"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-green-500/30 rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-green-500/30 rounded-br-3xl" />

          {/* Glowing orb background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Profile Image */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="relative mb-6"
            >
              <div className="w-36 h-36 rounded-full border-4 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)] overflow-hidden">
                <img
                  src={member.image || member.photo || fallbackPhoto}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => { e.target.src = fallbackPhoto; }}
                />
              </div>
              {/* Online indicator */}
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-3 border-neutral-900 shadow-lg" />
            </motion.div>

            {/* Name */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-3xl font-bold text-white mb-2 font-display"
            >
              {member.name}
            </motion.h2>

            {/* Position Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="px-4 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mb-4"
            >
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                {member.role || member.position}
              </span>
            </motion.div>

            {/* Domain */}
            {member.domain && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="text-neutral-400 text-sm mb-6"
              >
                {member.domain} Domain
              </motion.p>
            )}

            {/* Social Links */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4"
            >
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-neutral-800/80 text-neutral-400 hover:bg-blue-600 hover:text-white transition-all shadow-lg"
                >
                  <Linkedin size={22} />
                </a>
              )}
              {member.instagram && (
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-neutral-800/80 text-neutral-400 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all shadow-lg"
                >
                  <Instagram size={22} />
                </a>
              )}
              {member.github && member.github !== 'NA' && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-neutral-800/80 text-neutral-400 hover:bg-neutral-700 hover:text-white transition-all shadow-lg"
                >
                  <Github size={22} />
                </a>
              )}
            </motion.div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-neutral-800/80 text-neutral-400 hover:bg-neutral-700 hover:text-white transition-all"
          >
            <span className="text-xl">✕</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};


const Team = () => {
  const [allMembers, setAllMembers] = useState([]);
  const [domains, setDomains] = useState([]);
  const [activeDomain, setActiveDomain] = useState("");
  const [activeSection, setActiveSection] = useState("faculty");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);


  // Scroll spy effect - improved detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['faculty', 'board', 'domains'];
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
  const getBoardMembers = () => allMembers.filter(m =>
    BOARD_MEMBER_POSITIONS.some(pos => m.position?.toLowerCase().includes(pos))
  );

  const getLeadersByDomain = (domain) => {
    const leaders = allMembers.filter(m =>
      m.domain === domain && LEADERSHIP_POSITIONS.some(pos => m.position?.toLowerCase().includes(pos))
    );

    // Sort priority: Head > Syndicate > Lead (Tie-breaker: Alphabetical by Name)
    return leaders.sort((a, b) => {
      const getPriority = (position) => {
        const p = position?.toLowerCase() || '';
        if (p.includes('head')) return 1;
        if (p.includes('syndicate')) return 2;
        if (p.includes('lead')) return 3;
        return 4;
      };

      const priorityDiff = getPriority(a.position) - getPriority(b.position);
      if (priorityDiff !== 0) return priorityDiff;

      return a.name.localeCompare(b.name);
    });
  };

  const getMembersByDomain = (domain) => allMembers.filter(m =>
    m.domain === domain && m.position?.toLowerCase() === 'member'
  ).sort((a, b) => a.name.localeCompare(b.name));

  // Navigation sections
  const navSections = [
    { id: 'faculty', label: 'Faculty' },
    { id: 'board', label: 'Board' },
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
          <div className="flex justify-center">
            <TeamCard member={facultyData} variant="default" className="md:mx-0" onClick={() => setSelectedMember(facultyData)} />
          </div>
        </section>

        {/* Core Team Section */}
        <section className="mb-20">
          <SectionHeader id="board" title="Board" subtitle="Members" />
          <div className="flex flex-wrap justify-center gap-6">
            {getBoardMembers().map((member, idx) => (
              <TeamCard key={idx} member={member} variant="default" onClick={() => setSelectedMember(member)} />
            ))}
          </div>
          {getBoardMembers().length === 0 && (
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
                      <TeamCard key={idx} member={member} variant="default" onClick={() => setSelectedMember(member)} />
                    ))}
                  </div>
                )}

                {/* Domain Members */}
                {getMembersByDomain(activeDomain).length > 0 && (
                  <div>
                    <h4 className="text-lg font-medium text-neutral-400 mb-4">Team Members</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {getMembersByDomain(activeDomain).map((member, idx) => (
                        <MemberCard key={idx} member={member} onClick={() => setSelectedMember(member)} />
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

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedMember && (
          <ProfileModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Team;
