"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
    className?: string;
    reverse?: boolean;
    pauseOnHover?: boolean;
    children?: React.ReactNode;
    vertical?: boolean;
    repeat?: number;
}

export function Marquee({
    className,
    reverse,
    pauseOnHover = false,
    children,
    vertical = false,
    repeat = 4,
}: MarqueeProps) {
    return (
        <div
            className={cn(
                "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
                {
                    "flex-row": !vertical,
                    "flex-col": vertical,
                },
                className
            )}
        >
            {Array(repeat)
                .fill(0)
                .map((_, i) => (
                    <div
                        key={i}
                        className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
                            "animate-marquee flex-row": !vertical,
                            "animate-marquee-vertical flex-col": vertical,
                            "group-hover:[animation-play-state:paused]": pauseOnHover,
                            "[animation-direction:reverse]": reverse,
                        })}
                    >
                        {children}
                    </div>
                ))}
        </div>
    );
}

// Simple text ticker component
export function TextTicker({
    texts,
    className,
    textClassName,
}: {
    texts: string[];
    className?: string;
    textClassName?: string;
}) {
    return (
        <Marquee className={cn("py-4 border-y border-green-500/20 bg-black/50", className)}>
            {texts.map((text, index) => (
                <span
                    key={index}
                    className={cn(
                        "mx-8 text-2xl md:text-4xl font-bold text-white/80 whitespace-nowrap",
                        textClassName
                    )}
                >
                    {text}
                    <span className="ml-8 text-green-500">•</span>
                </span>
            ))}
        </Marquee>
    );
}
