"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const accentColors = [
    { border: "border-pink-500", bg: "bg-pink-500", text: "text-pink-400", glow: "shadow-pink-500/30" },
    { border: "border-cyan-500", bg: "bg-cyan-500", text: "text-cyan-400", glow: "shadow-cyan-500/30" },
    { border: "border-yellow-500", bg: "bg-yellow-500", text: "text-yellow-400", glow: "shadow-yellow-500/30" },
    { border: "border-green-500", bg: "bg-green-500", text: "text-green-400", glow: "shadow-green-500/30" },
    { border: "border-purple-500", bg: "bg-purple-500", text: "text-purple-400", glow: "shadow-purple-500/30" },
    { border: "border-orange-500", bg: "bg-orange-500", text: "text-orange-400", glow: "shadow-orange-500/30" },
];

interface InitiativeCard {
    id: number;
    Icon: any;
    title: string;
    description: string;
    href: string;
}

interface InitiativesCarouselProps {
    initiatives: InitiativeCard[];
    className?: string;
}

export function InitiativesCarousel({ initiatives, className }: InitiativesCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartX = useRef(0);
    const total = initiatives.length;

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % total);
    }, [total]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + total) % total);
    }, [total]);

    // Auto-play
    useEffect(() => {
        if (isPaused || isDragging) return;
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [isPaused, isDragging, nextSlide]);

    // Calculate offset for each card relative to current
    const getOffset = (index: number) => {
        let offset = index - currentIndex;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;
        return offset;
    };

    // Drag handlers
    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        dragStartX.current = clientX;
    };

    const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return;
        const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
        const diff = dragStartX.current - clientX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
        setIsDragging(false);
    };

    return (
        <section className={cn("py-20 bg-black relative overflow-hidden", className)}>
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 font-display">
                        Our <span className="text-green-500">Initiatives</span>
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                        Pioneering the future through technology and innovation
                    </p>
                </motion.div>

                {/* Carousel Container - Draggable */}
                <div
                    className="relative h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => { setIsPaused(false); setIsDragging(false); }}
                    onMouseDown={handleDragStart}
                    onMouseUp={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchEnd={handleDragEnd}
                >
                    {/* Cards - 3D Stacked effect */}
                    <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
                        {initiatives.map((card, index) => {
                            const offset = getOffset(index);
                            const isCenter = offset === 0;
                            const isAdjacent = Math.abs(offset) === 1;
                            const isVisible = Math.abs(offset) <= 2;
                            const accent = accentColors[index % accentColors.length];

                            const xOffset = offset * 200;
                            const scale = isCenter ? 1 : isAdjacent ? 0.9 : 0.8;
                            const opacity = isVisible ? (isCenter ? 1 : isAdjacent ? 0.7 : 0.5) : 0;
                            const zIndex = isCenter ? 30 : isAdjacent ? 20 : 10;

                            return (
                                <div
                                    key={card.id}
                                    onClick={() => !isCenter && !isDragging && setCurrentIndex(index)}
                                    style={{
                                        transform: `translateX(${xOffset}px) scale(${scale})`,
                                        opacity,
                                        zIndex,
                                        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                                        pointerEvents: isVisible ? "auto" : "none",
                                    }}
                                    className={cn(
                                        "absolute w-64 md:w-72 h-80 p-6 rounded-xl bg-neutral-950/95 border-2 flex flex-col",
                                        isCenter ? `${accent.border} shadow-lg ${accent.glow}` : "border-neutral-800/50 cursor-pointer hover:border-neutral-700"
                                    )}
                                >
                                    <div className={cn("w-10 h-1 rounded-full mb-4", accent.bg)} />

                                    <div className={cn(
                                        "absolute top-4 right-4 text-3xl font-bold font-display",
                                        isCenter ? accent.text : "text-neutral-700"
                                    )}>
                                        {String(card.id).padStart(2, "0")}.
                                    </div>

                                    <h3 className={cn(
                                        "text-lg font-bold mb-3 font-display leading-tight",
                                        isCenter ? "text-white" : "text-neutral-500"
                                    )}>
                                        {card.title}
                                    </h3>

                                    <p className={cn(
                                        "text-sm leading-relaxed flex-grow",
                                        isCenter ? "text-neutral-400" : "text-neutral-600"
                                    )}>
                                        {card.description}
                                    </p>

                                    <div className="mt-4">
                                        {isCenter ? (
                                            <Link
                                                to={card.href}
                                                className={cn(
                                                    "inline-flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-300",
                                                    accent.border,
                                                    "hover:bg-white/5"
                                                )}
                                            >
                                                <ArrowRight className={cn("w-5 h-5", accent.text)} />
                                            </Link>
                                        ) : (
                                            <div className="w-10 h-10 rounded-lg border border-neutral-800 flex items-center justify-center">
                                                <ArrowRight className="w-5 h-5 text-neutral-700" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    {initiatives.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all duration-300",
                                index === currentIndex
                                    ? "w-8 bg-green-500"
                                    : "bg-neutral-700 hover:bg-neutral-600"
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
