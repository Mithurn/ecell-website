import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { motion } from "framer-motion";

const Startups = () => {
    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Navbar />

            <div className="flex-grow flex flex-col items-center justify-center relative overflow-hidden py-32">
                {/* Background visual effects */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-black to-black pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center px-4"
                >
                    <h1 className="text-6xl md:text-9xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600 mb-8 tracking-tighter">
                        Coming Soon
                    </h1>
                    <div className="h-1 w-24 bg-green-500 mx-auto mb-8 rounded-full" />
                    <p className="text-xl md:text-2xl text-neutral-400 font-light max-w-2xl mx-auto">
                        We are curating a list of our most innovative incubated startups.
                        <br />
                        <span className="text-green-500 font-medium">Stay tuned for the showcase.</span>
                    </p>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default Startups;
