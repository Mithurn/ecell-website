import React, { useEffect, useState, useRef, useMemo } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { fetchTeamMembers } from "../../services/teamService";
import Squares from "../../components/ui/Squares";
import { Code, Terminal, Cpu, Github, Linkedin, Instagram } from "lucide-react";

// Developer names to filter from the main team list (Alphabetical Order)
const DEV_NAMES = [
    "Arihant", // Matches "Arihant Jain" or similar
    "Krishna", // Matches "Krishna Keshab Banik"
    "Mithurn"  // Matches "Mithurn Jeromme"
];

// Matrix Code Rain Component - Memoized to prevent re-renders
const MatrixRain = React.memo(() => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const chars = '01アイウエオカキクケコサシスセソタチツテト';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#22c55e';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 50);
        return () => clearInterval(interval);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-20 transition-opacity duration-700" />;
});

// Typewriter Hook
const useTypewriter = (text, speed = 100) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayText(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed]);

    return displayText;
};

const DevCard = ({ dev, index }) => {
    const cardRef = useRef(null);

    // 3D Tilt Effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) / (rect.width / 2));
        mouseY.set((e.clientY - centerY) / (rect.height / 2));
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Assign specific icons/colors based on role or index for flair
    const icons = [<Terminal size={40} />, <Cpu size={40} />, <Code size={40} />];
    const colors = [
        "from-green-400 to-emerald-600",
        "from-green-400 to-teal-500",
        "from-emerald-400 to-green-600"
    ];

    const icon = icons[index % icons.length];
    const color = colors[index % colors.length];

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8 overflow-hidden hover:border-green-500/50 transition-all duration-500"
        >
            {/* Matrix Rain Background */}
            <MatrixRain />

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Animated Border Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

            <div className="relative z-10 flex flex-col items-center text-center">
                {/* Profile Image with Glow */}
                <motion.div
                    className="mb-6 relative w-32 h-32 rounded-full border-2 border-neutral-700 group-hover:border-green-500/50 transition-colors duration-300 shadow-[0_0_20px_rgba(34,197,94,0.1)] group-hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    <img
                        src={dev.photo}
                        alt={dev.name}
                        className="w-full h-full object-cover object-top"
                    />
                </motion.div>

                <h3 className="text-3xl font-bold font-display text-white mb-2 group-hover:text-green-400 transition-colors">
                    {dev.name}
                </h3>

                <p className={`text-sm font-semibold uppercase tracking-widest bg-gradient-to-r ${color} bg-clip-text text-transparent mb-4`}>
                    {dev.position === 'Member' ? 'Core Developer' : dev.position}
                </p>

                <p className="text-neutral-400 mb-8 max-w-xs mx-auto leading-relaxed text-sm">
                    Building the future of E-Cell with code and creativity.
                </p>

                <div className="flex gap-4 opacity-100 transition-opacity duration-300">
                    {dev.github && dev.github !== 'NA' && (
                        <a href={dev.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-all">
                            <Github size={20} />
                        </a>
                    )}
                    {dev.linkedin && (
                        <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-blue-400 hover:bg-neutral-700 transition-all">
                            <Linkedin size={20} />
                        </a>
                    )}
                    {dev.instagram && (
                        <a href={dev.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-pink-500 hover:bg-neutral-700 transition-all">
                            <Instagram size={20} />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

// Typewriter Heading Component
const TypewriterHeading = () => {
    const text = "Meet the Builders";
    const displayText = useTypewriter(text, 80);
    const isComplete = displayText.length === text.length;

    return (
        <h1 className="text-6xl md:text-8xl font-bold font-display mb-6 tracking-tight min-h-[5rem]">
            {displayText.split(' ').map((word, i) => {
                if (word === 'Builders') {
                    return <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">{word}</span>;
                }
                return <span key={i}>{word} </span>;
            })}
            {!isComplete && <span className="animate-pulse text-green-500">|</span>}
        </h1>
    );
};

const Developers = () => {
    const [developers, setDevelopers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDevs = async () => {
            const allMembers = await fetchTeamMembers();
            // Filter for specific developers and sort by the order in DEV_NAMES
            const devTeam = DEV_NAMES.map(name =>
                allMembers.find(m => m.name.toLowerCase().includes(name.toLowerCase()))
            ).filter(Boolean);

            setDevelopers(devTeam);
            setLoading(false);
        };
        loadDevs();
    }, []);

    // Detect mobile for performance optimization
    const isMobile = useMemo(() => {
        if (typeof window === 'undefined') return false;
        return window.innerWidth < 768;
    }, []);

    if (loading) return <div className="min-h-screen bg-black" />;

    return (
        <div className="min-h-screen bg-black text-white selection:bg-green-500/30">
            <Navbar />

            <div className="relative pt-24 pb-16 overflow-hidden">
                {/* Background Decoration - Fixed position with GPU acceleration */}
                <div
                    className="fixed inset-0 w-full h-full opacity-20 pointer-events-none"
                    style={{ transform: 'translate3d(0,0,0)', willChange: 'transform' }}
                >
                    <Squares
                        speed={isMobile ? 0.3 : 0.5}
                        squareSize={isMobile ? 50 : 40}
                        direction='diagonal'
                        borderColor='#22c55e'
                        hoverFillColor='#14532d'
                    />
                </div>


                <div className="container mx-auto px-4 relative z-10">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* <h2 className="text-sm font-mono text-green-500 tracking-[0.2em] mb-4 uppercase">
                                &lt; The Architects /&gt;
                            </h2> */}
                            <TypewriterHeading />
                            <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-light">
                                Crafting digital experiences with passion, precision, and line after line of code.
                            </p>
                        </motion.div>
                    </div>

                    {/* Developers Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {developers.map((dev, index) => (
                            <DevCard key={index} dev={dev} index={index} />
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center mt-12"
                    >
                        <p className="font-mono text-neutral-500 text-sm">
                            // Made with ❤️ by the E-Cell Tech Team
                        </p>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Developers;
