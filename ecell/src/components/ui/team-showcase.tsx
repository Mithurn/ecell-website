"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamMember {
    name: string;
    role: string;
    category: string;
    image: string;
    quote: string;
    linkedin?: string;
    email?: string;
}

const teamMembers: TeamMember[] = [
    {
        name: "Rahul Sharma",
        role: "President",
        category: "CORE TEAM",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
        quote: "Entrepreneurship is about turning dreams into reality. At E-Cell, we build the launchpad for tomorrow's innovators.",
        linkedin: "https://linkedin.com",
        email: "president@ecell.com",
    },
    {
        name: "Priya Patel",
        role: "Vice President",
        category: "CORE TEAM",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
        quote: "Every great startup begins with a simple idea and relentless execution. We're here to guide that journey.",
        linkedin: "https://linkedin.com",
        email: "vp@ecell.com",
    },
    {
        name: "Arjun Menon",
        role: "Technical Lead",
        category: "TECHNICAL",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
        quote: "Technology is the backbone of modern entrepreneurship. We code, we create, we innovate.",
        linkedin: "https://linkedin.com",
        email: "tech@ecell.com",
    },
    {
        name: "Sneha Reddy",
        role: "Creatives Head",
        category: "CREATIVES",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
        quote: "Design is not just about looks; it's about problem-solving. Our creative team ensures every E-Cell initiative communicates effectively.",
        linkedin: "https://linkedin.com",
        email: "creatives@ecell.com",
    },
    {
        name: "Vikram Singh",
        role: "Corporate Relations",
        category: "CORPORATE",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
        quote: "Building bridges between startups and industry giants is what drives sustainable innovation.",
        linkedin: "https://linkedin.com",
        email: "corporate@ecell.com",
    },
];

export function TeamShowcase() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextMember = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }, []);

    const prevMember = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
    }, []);

    // Auto-rotate every 5 seconds
    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(nextMember, 5000);
        return () => clearInterval(timer);
    }, [isPaused, nextMember]);

    const currentMember = teamMembers[currentIndex];

    return (
        <section className="py-20 bg-black relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 font-display">
                        Meet Our <span className="text-green-500">Core Team</span>
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                        The passionate individuals driving innovation at E-Cell
                    </p>
                </motion.div>

                {/* Main Content */}
                <div
                    className="relative flex items-center justify-center lg:justify-start gap-8"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Team Member Card */}
                    <div className="relative w-full max-w-sm">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentMember.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="bg-neutral-950 border border-green-500/20 rounded-2xl overflow-hidden"
                            >
                                {/* Image */}
                                <div className="relative h-72 overflow-hidden">
                                    <motion.img
                                        src={currentMember.image}
                                        alt={currentMember.name}
                                        className="w-full h-full object-cover"
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="p-6 relative -mt-16 z-10">
                                    <motion.h3
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-2xl font-bold text-white mb-1 font-display"
                                    >
                                        {currentMember.name}
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 }}
                                        className="text-green-400 text-sm font-medium mb-4"
                                    >
                                        {currentMember.role}
                                    </motion.p>
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-neutral-400 text-sm leading-relaxed line-clamp-3"
                                    >
                                        {currentMember.quote}
                                    </motion.p>

                                    {/* Social Links */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.25 }}
                                        className="flex items-center gap-4 mt-6"
                                    >
                                        <span className="text-sm text-neutral-500">Want to Connect?</span>
                                        <div className="flex gap-2">
                                            {currentMember.email && (
                                                <a
                                                    href={`mailto:${currentMember.email}`}
                                                    className="p-2 rounded-lg bg-neutral-900 border border-green-500/20 text-neutral-400 hover:text-green-400 hover:border-green-500/50 transition-all"
                                                >
                                                    <Mail className="w-4 h-4" />
                                                </a>
                                            )}
                                            {currentMember.linkedin && (
                                                <a
                                                    href={currentMember.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-lg bg-neutral-900 border border-green-500/20 text-neutral-400 hover:text-green-400 hover:border-green-500/50 transition-all"
                                                >
                                                    <Linkedin className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                onClick={prevMember}
                                className="p-3 rounded-full bg-neutral-900/80 border border-green-500/30 text-white hover:bg-green-500/20 transition-all"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextMember}
                                className="p-3 rounded-full bg-neutral-900/80 border border-green-500/30 text-white hover:bg-green-500/20 transition-all"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Vertical Rotated Category Text */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentMember.category}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2"
                        >
                            <div
                                className="text-6xl xl:text-8xl font-bold text-green-500/10 font-display whitespace-nowrap"
                                style={{
                                    writingMode: "vertical-rl",
                                    textOrientation: "mixed",
                                }}
                            >
                                {currentMember.category}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Dots Indicator */}
                    <div className="hidden lg:flex absolute right-16 top-1/2 -translate-y-1/2 flex-col gap-2">
                        {teamMembers.map((member, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all duration-300",
                                    index === currentIndex
                                        ? "h-8 bg-green-500"
                                        : "bg-neutral-700 hover:bg-neutral-600"
                                )}
                                aria-label={`View ${member.name}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Mobile Dots */}
                <div className="flex lg:hidden justify-center gap-2 mt-6">
                    {teamMembers.map((member, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all duration-300",
                                index === currentIndex
                                    ? "w-8 bg-green-500"
                                    : "bg-neutral-700 hover:bg-neutral-600"
                            )}
                            aria-label={`View ${member.name}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
