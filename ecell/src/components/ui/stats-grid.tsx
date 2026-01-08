"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface StatCardProps {
    value: string;
    label: string;
    suffix?: string;
    className?: string;
}

function AnimatedNumber({ value, suffix = "" }: { value: string; suffix?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState(0);

    const numericValue = parseInt(value.replace(/\D/g, ""), 10);

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const increment = numericValue / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    setDisplayValue(numericValue);
                    clearInterval(timer);
                } else {
                    setDisplayValue(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }
    }, [isInView, numericValue]);

    return (
        <span ref={ref} className="tabular-nums">
            {displayValue}{suffix}
        </span>
    );
}

export function StatCard({ value, label, suffix = "+", className }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={cn(
                "relative group p-8 rounded-2xl bg-neutral-950/80 backdrop-blur-sm",
                "border border-green-500/20 hover:border-green-500/60",
                "transition-all duration-300",
                // Neon glow effect
                "shadow-[0_0_15px_rgba(34,197,94,0.1)] hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]",
                className
            )}
        >
            {/* Spotlight overlay on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 text-center">
                <div className="text-5xl md:text-6xl font-bold text-white mb-2 font-display">
                    <AnimatedNumber value={value} suffix={suffix} />
                </div>
                <div className="text-lg text-neutral-400 font-medium">{label}</div>
            </div>
        </motion.div>
    );
}

interface StatsGridProps {
    stats: { value: string; label: string; suffix?: string }[];
    className?: string;
}

export function StatsGrid({ stats, className }: StatsGridProps) {
    return (
        <section className={cn("py-20 bg-black", className)}>
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">
                        Our <span className="text-green-500">Impact</span>
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                        Numbers that define our journey of fostering innovation
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={index}
                            value={stat.value}
                            label={stat.label}
                            suffix={stat.suffix}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
