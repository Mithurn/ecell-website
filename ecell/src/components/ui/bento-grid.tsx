import { ReactNode, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoGrid = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                className,
            )}
        >
            {children}
        </div>
    );
};

const BentoCard = ({
    name,
    className,
    background,
    Icon,
    description,
    href,
    cta,
    onClick,
}: {
    name: string;
    className: string;
    background: ReactNode;
    Icon: any;
    description: string;
    href: string;
    cta: string;
    onClick?: () => void;
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={cn(
                "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl min-h-[16rem]",
                // dark styles with green accent
                "bg-neutral-950 border border-green-500/20 hover:border-green-500/50 transition-all duration-300",
                "shadow-lg shadow-green-500/5 hover:shadow-green-500/20 cursor-pointer",
                className,
            )}
        >
            {/* Spotlight Effect */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(34,197,94,0.15), transparent 40%)`,
                }}
            />

            <div>{background}</div>
            <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
                <Icon className="h-12 w-12 origin-left transform-gpu text-green-500 transition-all duration-300 ease-in-out group-hover:scale-75" />
                <h3 className="text-xl font-semibold text-white">
                    {name}
                </h3>
                <p className="max-w-lg text-neutral-400">{description}</p>
            </div>

            <div
                className={cn(
                    "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
                )}
            >
                <Button variant="ghost" asChild size="sm" className="pointer-events-auto text-green-400 hover:text-green-300">
                    <span onClick={(e) => {
                        // If we are navigating, stop propagation if we don't want to open modal?
                        // Actually, user wants modal. So maybe the CTA should just open modal too?
                        // Or CTA navigates to href.
                        // I'll leave href for navigation and click for modal if user clicks card.
                        e.stopPropagation();
                    }}>
                        <Link to={href}>
                            {cta}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </span>
                </Button>
            </div>
            <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-green-500/5" />
        </div>
    );
};

export { BentoCard, BentoGrid };
