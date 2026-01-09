"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Palette, Rocket, TrendingUp, X, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Domain {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    longDescription: string;
    Icon: any;
    color: string;
    bgGradient: string;
}

const domains: Domain[] = [
    {
        id: 1,
        title: "Technical",
        subtitle: "Web & App Development",
        description: "Building innovative digital solutions",
        longDescription: "Our Technical domain focuses on building innovative digital solutions through web development, app development, and software engineering. We create cutting-edge applications, websites, and tools that power the entrepreneurial ecosystem. From hackathons to workshops, we train the next generation of tech leaders.",
        Icon: Code,
        color: "text-cyan-400",
        bgGradient: "from-cyan-500/20 to-transparent",
    },
    {
        id: 2,
        title: "AI/ML",
        subtitle: "Data Science & Intelligence",
        description: "Leveraging AI to solve real-world problems",
        longDescription: "The AI/ML domain harnesses the power of artificial intelligence and machine learning to solve real-world problems. We conduct research projects, organize AI workshops, and build intelligent systems that help startups make data-driven decisions. Our team works on everything from predictive analytics to computer vision.",
        Icon: Rocket,
        color: "text-purple-400",
        bgGradient: "from-purple-500/20 to-transparent",
    },
    {
        id: 3,
        title: "Creatives",
        subtitle: "Design & Media",
        description: "Creating stunning visual content",
        longDescription: "Our Creatives domain brings ideas to life through stunning visual content, graphics, videos, and brand identities. We handle all design aspects from UI/UX to motion graphics. The team creates compelling content for events, social media, and startup branding that captivates audiences and tells powerful stories.",
        Icon: Palette,
        color: "text-pink-400",
        bgGradient: "from-pink-500/20 to-transparent",
    },
    {
        id: 4,
        title: "Corporate",
        subtitle: "Business Development",
        description: "Building partnerships and driving growth",
        longDescription: "The Corporate domain is the backbone of our business operations. We build strategic partnerships, secure sponsorships, manage investor relations, and drive business growth. Our team connects startups with industry mentors, arranges funding opportunities, and builds an extensive network of entrepreneurs and investors.",
        Icon: TrendingUp,
        color: "text-green-400",
        bgGradient: "from-green-500/20 to-transparent",
    },
];

export function DomainsShowcase() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);

    const nextDomain = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % domains.length);
    }, []);

    const prevDomain = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + domains.length) % domains.length);
    }, []);

    // Auto-rotate every 5 seconds
    useEffect(() => {
        if (isPaused || selectedDomain) return;
        const timer = setInterval(nextDomain, 5000);
        return () => clearInterval(timer);
    }, [isPaused, nextDomain, selectedDomain]);

    return (
        <section className="py-20 bg-gradient-to-b from-neutral-950 to-black border-y border-green-500/20 relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 font-display">
                        Our <span className="text-green-500">Domains</span>
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                        Specialized teams driving innovation across multiple verticals
                    </p>
                </motion.div>

                {/* Main Content - Split Layout */}
                <div
                    className="grid lg:grid-cols-2 gap-12 items-center"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Left Side - Domain Info (CSS Transitions - All mounted) */}
                    <div className="relative h-[400px] overflow-hidden">
                        {domains.map((domain, index) => {
                            const isCurrent = index === currentIndex;
                            const DomainIcon = domain.Icon;

                            return (
                                <div
                                    key={domain.id}
                                    style={{
                                        opacity: isCurrent ? 1 : 0,
                                        transform: isCurrent ? "translateX(0)" : "translateX(-30px)",
                                        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                                        pointerEvents: isCurrent ? "auto" : "none",
                                    }}
                                    className="absolute inset-0"
                                >
                                    {/* Gradient background */}
                                    <div className={cn("absolute inset-0 bg-gradient-to-br rounded-3xl opacity-30", domain.bgGradient)} />

                                    <div className="relative z-10 p-8 h-full flex flex-col justify-center">
                                        {/* Domain number */}
                                        <span className="text-7xl font-bold text-white/10 font-display mb-4">
                                            0{domain.id}
                                        </span>

                                        {/* Icon */}
                                        <DomainIcon className={cn("w-16 h-16 mb-6", domain.color)} />

                                        {/* Title */}
                                        <h3 className="text-4xl font-bold text-white mb-2 font-display">
                                            {domain.title}
                                        </h3>

                                        {/* Subtitle */}
                                        <p className={cn("text-lg mb-4", domain.color)}>
                                            {domain.subtitle}
                                        </p>

                                        {/* Description */}
                                        <p className="text-neutral-400 text-lg">
                                            {domain.description}
                                        </p>

                                        {/* Learn More Button */}
                                        <button
                                            onClick={() => setSelectedDomain(domain)}
                                            className={cn(
                                                "mt-6 px-6 py-3 rounded-full border-2 font-semibold transition-all duration-300 w-fit",
                                                "border-green-500/50 text-green-400 hover:bg-green-500/10 hover:border-green-500"
                                            )}
                                        >
                                            Learn More →
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Side - Domain Cards */}
                    <div className="relative">
                        {/* Navigation Arrows */}
                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20 hidden lg:flex">
                            <button
                                onClick={prevDomain}
                                className="p-2 rounded-full bg-neutral-900/80 border border-green-500/30 text-white hover:bg-green-500/20 transition-all"
                            >
                                <ChevronUp className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextDomain}
                                className="p-2 rounded-full bg-neutral-900/80 border border-green-500/30 text-white hover:bg-green-500/20 transition-all"
                            >
                                <ChevronDown className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Cards Stack - Using CSS transitions */}
                        <div className="flex flex-col gap-4">
                            {domains.map((domain, index) => {
                                const isCurrent = index === currentIndex;
                                const DomainIcon = domain.Icon;

                                return (
                                    <div
                                        key={domain.id}
                                        onClick={() => {
                                            setCurrentIndex(index);
                                            if (isCurrent) setSelectedDomain(domain);
                                        }}
                                        style={{
                                            transform: isCurrent ? "scale(1)" : "scale(0.95)",
                                            opacity: isCurrent ? 1 : 0.5,
                                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                        }}
                                        className={cn(
                                            "p-6 rounded-xl border-2 cursor-pointer flex items-center gap-4",
                                            "bg-neutral-950/80 backdrop-blur-sm",
                                            isCurrent
                                                ? "border-green-500/60 shadow-lg shadow-green-500/10"
                                                : "border-neutral-800/50 hover:border-neutral-700 hover:opacity-80"
                                        )}
                                    >
                                        <DomainIcon className={cn("w-10 h-10", isCurrent ? domain.color : "text-neutral-600")} />
                                        <div>
                                            <h4 className={cn(
                                                "text-lg font-bold font-display",
                                                isCurrent ? "text-white" : "text-neutral-500"
                                            )}>
                                                {domain.title}
                                            </h4>
                                            <p className={cn(
                                                "text-sm",
                                                isCurrent ? "text-neutral-400" : "text-neutral-600"
                                            )}>
                                                {domain.subtitle}
                                            </p>
                                        </div>
                                        <div className={cn(
                                            "ml-auto text-3xl font-bold font-display",
                                            isCurrent ? domain.color : "text-neutral-700"
                                        )}>
                                            0{domain.id}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Progress Bar */}
                        <div className="flex gap-2 justify-center mt-6">
                            {domains.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className="relative h-1 rounded-full overflow-hidden bg-neutral-800 w-12"
                                >
                                    <div
                                        style={{
                                            width: index === currentIndex ? "100%" : "0%",
                                            transition: index === currentIndex && !isPaused && !selectedDomain
                                                ? "width 5s linear"
                                                : "width 0.3s ease-out",
                                        }}
                                        className="absolute inset-0 bg-green-500"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Popup Modal */}
            <AnimatePresence>
                {selectedDomain && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedDomain(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-neutral-950 border border-green-500/30 rounded-2xl p-8 max-w-lg w-full relative shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedDomain(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <selectedDomain.Icon className={cn("w-16 h-16 mb-4", selectedDomain.color)} />

                            <h3 className="text-3xl font-bold text-white mb-2 font-display">
                                {selectedDomain.title}
                            </h3>
                            <p className={cn("text-lg mb-4", selectedDomain.color)}>
                                {selectedDomain.subtitle}
                            </p>
                            <p className="text-neutral-400 leading-relaxed">
                                {selectedDomain.longDescription}
                            </p>

                            <button
                                onClick={() => setSelectedDomain(null)}
                                className="mt-6 px-6 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-all"
                            >
                                Got it!
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
