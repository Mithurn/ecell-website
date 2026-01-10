"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronDown, Play } from "lucide-react";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position
            } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position
            } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position
            } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-green-500"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

// Rotating words for typing animation
const rotatingWords = ["Innovate", "Build", "Scale", "Transform", "Launch"];

export function BackgroundPaths({
    title = "Entrepreneurship Cell SRMIST",
    topContent,
}: {
    title?: string;
    topContent?: React.ReactNode;
}) {
    const words = title.split(" ");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    // Rotate words every 2.5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            {/* Dark vignette to fade lines in center */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 70%)"
                }}
            />

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-5xl mx-auto"
                >
                    {topContent && (
                        <div className="mb-8 flex justify-center">
                            {topContent}
                        </div>
                    )}

                    {/* Main Title */}
                    <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tighter font-display">
                        {words.map((word, wordIndex) => {
                            // Calculate cumulative letter count for proper timing
                            const previousLetters = words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0);

                            return (
                                <span
                                    key={wordIndex}
                                    className="inline-block mr-4 last:mr-0"
                                >
                                    {word.split("").map((letter, letterIndex) => (
                                        <motion.span
                                            key={`${wordIndex}-${letterIndex}`}
                                            initial={{ y: 100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                delay: (previousLetters + letterIndex) * 0.03,
                                                type: "spring",
                                                stiffness: 150,
                                                damping: 25,
                                            }}
                                            className="inline-block text-transparent bg-clip-text 
                                            bg-gradient-to-r from-green-400 to-emerald-500"
                                        >
                                            {letter}
                                        </motion.span>
                                    ))}
                                </span>
                            );
                        })}
                    </h1>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xl md:text-2xl text-white/90 mb-4 max-w-2xl mx-auto font-medium"
                    >
                        Fostering Innovation & Entrepreneurship
                    </motion.p>

                    {/* Typing Animation - Rotating Words */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="text-2xl md:text-3xl font-semibold mb-10 text-center ml-10"
                    >
                        <span className="text-neutral-500">We help you </span>
                        <span className="relative inline-block w-36 md:w-44 text-left">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={rotatingWords[currentWordIndex]}
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -40, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="absolute left-0 text-green-400"
                                >
                                    {rotatingWords[currentWordIndex]}
                                </motion.span>
                            </AnimatePresence>
                            <span className="invisible">{rotatingWords[0]}</span>
                        </span>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        {/* Primary CTA - With Glow */}
                        <div
                            className="relative group"
                        >
                            {/* Glow effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

                            <Button
                                asChild
                                variant="ghost"
                                className="relative rounded-xl px-8 py-6 text-lg font-semibold 
                                bg-green-600 hover:bg-green-500 
                                text-white transition-all duration-300 
                                border-2 border-green-400
                                shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:shadow-[0_0_40px_rgba(34,197,94,0.8)]"
                            >
                                <Link to="/about">
                                    <span>Discover Excellence</span>
                                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                                        →
                                    </span>
                                </Link>
                            </Button>
                        </div>

                        {/* Secondary CTA */}
                        <Button
                            asChild
                            variant="ghost"
                            className="rounded-xl px-8 py-6 text-lg font-semibold 
                            bg-transparent hover:bg-green-500/10 
                            text-white hover:text-white transition-all duration-300 
                            border-2 border-neutral-700 hover:border-green-500/50"
                        >
                            <Link to="/events" className="flex items-center gap-2">
                                <Play className="w-5 h-5" />
                                <span>View Events</span>
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-sm text-neutral-500">Scroll to explore</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-6 h-6 text-green-500" />
                </motion.div>
            </motion.div>
        </div>
    );
}
