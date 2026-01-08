import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
    DraggableCardBody,
    DraggableCardContainer,
} from "../../components/ui/draggable-card";
import { motion } from "framer-motion";
import { Rocket, TrendingUp, Users } from "lucide-react";

const Startups = () => {
    const startups = [
        {
            title: "TechVision AI",
            category: "Artificial Intelligence",
            description: "Revolutionary AI solutions for healthcare diagnostics",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=500&fit=crop",
            className: "absolute top-10 left-[35%] -translate-x-1/2 rotate-[-5deg]",
        },
        {
            title: "GreenTech Solutions",
            category: "Sustainability",
            description: "Eco-friendly innovations for a sustainable future",
            image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&h=500&fit=crop",
            className: "absolute top-40 left-[40%] -translate-x-1/2 rotate-[-7deg]",
        },
        {
            title: "EdTech Innovators",
            category: "Education Technology",
            description: "Transforming education through interactive learning platforms",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=500&fit=crop",
            className: "absolute top-5 left-[50%] -translate-x-1/2 rotate-[8deg]",
        },
        {
            title: "HealthFirst",
            category: "Healthcare",
            description: "Making healthcare accessible through telemedicine",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=500&fit=crop",
            className: "absolute top-32 left-[60%] -translate-x-1/2 rotate-[10deg]",
        },
        {
            title: "FinTech Plus",
            category: "Financial Technology",
            description: "Simplifying financial management for millennials",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&h=500&fit=crop",
            className: "absolute top-20 left-[65%] -translate-x-1/2 rotate-[2deg]",
        },
        {
            title: "AgriBot",
            category: "Agriculture Tech",
            description: "Smart farming solutions using IoT and automation",
            image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&h=500&fit=crop",
            className: "absolute top-24 left-[45%] -translate-x-1/2 rotate-[-7deg]",
        },
        {
            title: "FoodTech Hub",
            category: "Food Technology",
            description: "Revolutionizing food delivery with AI-powered recommendations",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=500&fit=crop",
            className: "absolute top-8 left-[55%] -translate-x-1/2 rotate-[4deg]",
        },
    ];

    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            {/* Hero Section */}
            <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-black to-neutral-950 border-b border-green-500/20 py-20">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-bold mb-6 font-display text-white">
                            Our <span className="text-green-500">Startups</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto mb-8">
                            Meet the innovative startups incubated at E-Cell SRMIST.
                            <br className="hidden md:block" />
                            <span className="text-green-400">Drag and explore their journeys!</span>
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Desktop View: Interactive Draggable Cards */}
            <section className="hidden md:block bg-black">
                <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip py-20">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-0">
                        <h3 className="text-4xl md:text-6xl font-bold text-white/20 font-display mb-4 uppercase tracking-wider">
                            Drag to Explore
                        </h3>
                        <p className="text-green-500/60 font-mono text-sm md:text-base animate-pulse">
                            &larr; Grab a card & throw it &rarr;
                        </p>
                    </div>
                    {startups.map((startup, index) => (
                        <DraggableCardBody key={index} className={startup.className}>
                            <div className="relative h-80 w-80 overflow-hidden rounded-lg border-2 border-green-500/30">
                                <img
                                    src={startup.image}
                                    alt={startup.title}
                                    className="pointer-events-none relative z-10 h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-20" />
                            </div>
                            <div className="mt-4 z-30 relative">
                                <h3 className="text-2xl font-bold text-white mb-2 font-display">
                                    {startup.title}
                                </h3>
                                <p className="text-sm font-semibold text-green-400 mb-2">
                                    {startup.category}
                                </p>
                                <p className="text-sm text-neutral-400">
                                    {startup.description}
                                </p>
                            </div>
                        </DraggableCardBody>
                    ))
                    }
                </DraggableCardContainer >
            </section >

            {/* Mobile View: Vertical Stack */}
            < section className="md:hidden bg-black py-12 px-4" >
                <div className="grid gap-6">
                    {startups.map((startup, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-neutral-900 border border-green-500/20 rounded-xl overflow-hidden"
                        >
                            <img
                                src={startup.image}
                                alt={startup.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-white mb-2 font-display">{startup.title}</h3>
                                <p className="text-green-500 text-sm font-semibold mb-2">{startup.category}</p>
                                <p className="text-neutral-400 text-sm leading-relaxed">{startup.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section >

            {/* Stats Section */}
            < section className="py-32 bg-gradient-to-b from-black to-neutral-950 border-y border-green-500/20" >
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl font-bold text-white mb-4 font-display">
                            Impact <span className="text-green-500">Metrics</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center p-10 bg-neutral-950 rounded-2xl border border-green-500/30 hover:border-green-500/60 transition-all group"
                        >
                            <Rocket className="w-16 h-16 mx-auto mb-4 text-green-400 group-hover:scale-110 transition-transform" />
                            <h3 className="text-5xl font-bold text-green-400 mb-3 font-display">50+</h3>
                            <p className="text-neutral-300 text-lg">Startups Incubated</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-center p-10 bg-neutral-950 rounded-2xl border border-green-500/30 hover:border-green-500/60 transition-all group"
                        >
                            <TrendingUp className="w-16 h-16 mx-auto mb-4 text-green-400 group-hover:scale-110 transition-transform" />
                            <h3 className="text-5xl font-bold text-green-400 mb-3 font-display">₹10Cr+</h3>
                            <p className="text-neutral-300 text-lg">Funding Raised</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-center p-10 bg-neutral-950 rounded-2xl border border-green-500/30 hover:border-green-500/60 transition-all group"
                        >
                            <Users className="w-16 h-16 mx-auto mb-4 text-green-400 group-hover:scale-110 transition-transform" />
                            <h3 className="text-5xl font-bold text-green-400 mb-3 font-display">30+</h3>
                            <p className="text-neutral-300 text-lg">Active Ventures</p>
                        </motion.div>
                    </div>
                </div>
            </section >

            {/* CTA Section */}
            < section className="py-32 bg-gradient-to-br from-green-950/20 via-black to-black border-t border-green-500/30" >
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-display">
                            Have a <span className="text-green-500">Startup Idea?</span>
                        </h2>
                        <p className="text-xl text-neutral-300 mb-8">
                            Get the mentorship, funding, and resources you need to bring your vision to life
                        </p>
                        <motion.a
                            href="/contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block px-12 py-5 bg-green-600 text-white text-lg font-bold rounded-full hover:bg-green-700 transition-all duration-300 shadow-lg shadow-green-600/50 border-2 border-green-500"
                        >
                            Get Started →
                        </motion.a>
                    </motion.div>
                </div>
            </section >

            <Footer />
        </div >
    );
};

export default Startups;
