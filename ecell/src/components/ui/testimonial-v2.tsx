"use client";
import React from 'react';
import { motion } from "framer-motion";

// --- Types ---
interface Testimonial {
    text: string;
    image: string;
    name: string;
    role: string;
}

// --- Data ---
const testimonials: Testimonial[] = [
    {
        text: "E-Cell gave me the funding and mentorship I needed to turn my prototype into a market-ready product. The ecosystem here is unmatched.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Briana Patton",
        role: "Founder, EcoTech",
    },
    {
        text: "The workshops on design thinking completely changed how I approach problem-solving. Highly recommended for any aspiring entrepreneur.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Bilal Ahmed",
        role: "Product Designer",
    },
    {
        text: "Networking events at E-Cell allowed me to meet my co-founder. We are now Series A funded!",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Saman Malik",
        role: "Co-Founder, DataFlow",
    },
    {
        text: "The incubation support provided workspace and resources that were crucial for our early survival.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Omar Raza",
        role: "CEO, NextGen Solutions",
    },
    {
        text: "I learned more about business strategy in 6 months at E-Cell than I did in 3 years of college courses.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Zainab Hussain",
        role: "Marketing Lead",
    },
    {
        text: "The pitch competitions are intense but incredibly rewarding. Winning the E-Summit gave us our first check.",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Aliza Khan",
        role: "Winner, E-Summit '23",
    },
    {
        text: "Being part of the organizing team taught me leadership and event management on a grand scale.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Farhan Siddiqui",
        role: "Former E-Cell Lead",
    },
    {
        text: "The community is vibrant and supportive. There's always someone willing to help you with your challenges.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Sana Sheikh",
        role: "Alumni",
    },
    {
        text: "A truly transformative experience. E-Cell is the heartbeat of innovation on campus.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Hassan Ali",
        role: "Student Entrepreneur",
    },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Sub-Components ---
const TestimonialsColumn = (props: {
    className?: string;
    testimonials: Testimonial[];
    duration?: number;
}) => {
    return (
        <div className={props.className}>
            <motion.ul
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {props.testimonials.map(({ text, image, name, role }, i) => (
                                <motion.li
                                    key={`${index}-${i}`}
                                    whileHover={{
                                        scale: 1.03,
                                        y: -8,
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                                    }}
                                    className="p-8 rounded-3xl border border-green-500/20 shadow-lg shadow-black/5 max-w-xs w-full bg-neutral-900 transition-all duration-300 cursor-default select-none group"
                                >
                                    <blockquote className="m-0 p-0">
                                        <p className="text-neutral-300 leading-relaxed font-normal m-0 transition-colors duration-300">
                                            {text}
                                        </p>
                                        <footer className="flex items-center gap-3 mt-6">
                                            <img
                                                width={40}
                                                height={40}
                                                src={image}
                                                alt={`Avatar of ${name}`}
                                                className="h-10 w-10 rounded-full object-cover ring-2 ring-green-500/50 group-hover:ring-green-500 transition-all duration-300 ease-in-out"
                                            />
                                            <div className="flex flex-col">
                                                <cite className="font-semibold not-italic tracking-tight leading-5 text-white transition-colors duration-300">
                                                    {name}
                                                </cite>
                                                <span className="text-sm leading-5 tracking-tight text-green-400 mt-0.5 transition-colors duration-300">
                                                    {role}
                                                </span>
                                            </div>
                                        </footer>
                                    </blockquote>
                                </motion.li>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </motion.ul>
        </div>
    );
};

export const TestimonialsV2 = () => {
    return (
        <section
            className="bg-black py-24 relative overflow-hidden"
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                    duration: 1,
                }}
                className="container px-4 z-10 mx-auto"
            >
                <div className="flex flex-col items-center justify-center max-w-[600px] mx-auto mb-16 text-center">
                    <div className="flex justify-center">
                        <div className="border border-green-500/30 py-1 px-4 rounded-full text-xs font-semibold tracking-wide uppercase text-green-400 bg-green-500/10 mb-6">
                            Testimonials
                        </div>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 font-display">
                        What People <span className="text-green-500">Say</span>
                    </h2>
                    <p className="text-neutral-400 text-lg leading-relaxed">
                        Hear from our community of entrepreneurs, innovators, and achievers who have transformed their journey with E-Cell.
                    </p>
                </div>

                <div
                    className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
                >
                    <TestimonialsColumn testimonials={firstColumn} duration={25} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={35} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={30} />
                </div>
            </motion.div>
        </section>
    );
};

export default TestimonialsV2;
