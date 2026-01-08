import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { StaggerTestimonials } from "../../components/ui/stagger-testimonials";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, Trophy, Sparkles, X, MapPin, Award } from "lucide-react";

const Events = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    const upcomingEvents = [
        {
            title: "E-Summit 2024",
            date: "March 15-17, 2024",
            description: "Our flagship entrepreneurship summit featuring industry leaders, workshops, and startup competitions",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
            category: "Summit",
            icon: <Trophy className="w-6 h-6" />
        },
        {
            title: "Startup Bootcamp",
            date: "February 10-11, 2024",
            description: "Intensive 2-day bootcamp covering everything from ideation to pitch deck creation",
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
            category: "Workshop",
            icon: <Sparkles className="w-6 h-6" />
        },
        {
            title: "Investor Connect",
            date: "April 5, 2024",
            description: "Network with angel investors and VCs looking to fund promising startups",
            image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
            category: "Networking",
            icon: <Users className="w-6 h-6" />
        },
    ];

    const pastEvents = [
        {
            id: 1,
            title: "Hackathon 2023",
            date: "December 15-17, 2023",
            participants: 500,
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=500&fit=crop",
            venue: "SRM Tech Park, Block 1",
            winners: [
                {
                    position: "1st Place",
                    team: "CodeCraft",
                    members: ["Rahul Kumar", "Priya Sharma", "Amit Patel"],
                    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
                    prize: "₹1,00,000"
                },
                {
                    position: "2nd Place",
                    team: "InnoWave",
                    members: ["Sneha Reddy", "Vikram Singh"],
                    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop",
                    prize: "₹50,000"
                },
                {
                    position: "3rd Place",
                    team: "TechTitans",
                    members: ["Arjun Verma", "Kavya Menon", "Rohan Das"],
                    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop",
                    prize: "₹25,000"
                }
            ],
            gallery: [
                "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop"
            ]
        },
        {
            id: 2,
            title: "Pitch Perfect 2023",
            date: "October 20, 2023",
            participants: 300,
            image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&h=500&fit=crop",
            venue: "SRM Main Auditorium",
            winners: [
                {
                    position: "1st Place",
                    team: "HealthFirst",
                    members: ["Dr. Anjali Nair", "Karthik Raj"],
                    image: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=400&h=300&fit=crop",
                    prize: "₹75,000 + Incubation"
                },
                {
                    position: "2nd Place",
                    team: "EduTech Solutions",
                    members: ["Meera Joshi", "Sanjay Gupta", "Nisha Kapoor"],
                    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
                    prize: "₹40,000"
                },
                {
                    position: "3rd Place",
                    team: "GreenEnergy",
                    members: ["Rajesh Pillai", "Divya Iyer"],
                    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop",
                    prize: "₹20,000"
                }
            ],
            gallery: [
                "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop"
            ]
        },
    ];

    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            {/* Hero Section */}
            <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-black via-neutral-950 to-black border-b border-green-500/20 py-20">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Calendar className="w-16 h-16 text-green-500 mx-auto mb-6" />
                        <h1 className="text-6xl md:text-8xl font-bold mb-6 font-display text-white">
                            Our <span className="text-green-500">Events</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto">
                            Empowering entrepreneurs through world-class events, workshops, and networking opportunities
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="py-32 bg-black">
                <div className="container mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl font-bold text-white mb-12 text-center font-display"
                    >
                        Upcoming <span className="text-green-500">Events</span>
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {upcomingEvents.map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                className="group relative bg-neutral-950 rounded-2xl overflow-hidden border border-green-500/20 hover:border-green-500/50 transition-all duration-300 cursor-pointer"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                                    <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold">
                                        {event.icon}
                                        {event.category}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors font-display">
                                        {event.title}
                                    </h3>
                                    <p className="text-green-500 text-sm font-semibold mb-3 flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {event.date}
                                    </p>
                                    <p className="text-neutral-400">
                                        {event.description}
                                    </p>
                                    <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 w-full group-hover:shadow-lg group-hover:shadow-green-600/50 border-2 border-green-500">
                                        Register Now
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Event Stats */}
            <section className="py-20 bg-gradient-to-b from-black to-neutral-950 border-y border-green-500/20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {[
                            { value: "100+", label: "Events Annually" },
                            { value: "5000+", label: "Participants" },
                            { value: "50+", label: "Industry Speakers" },
                            { value: "20+", label: "Workshops" },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <h3 className="text-5xl font-bold text-green-400 mb-2 font-display">{stat.value}</h3>
                                <p className="text-neutral-400">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-neutral-950">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-5xl font-bold text-white mb-4 font-display">
                            Event <span className="text-green-500">Highlights</span>
                        </h2>
                        <p className="text-xl text-neutral-400">
                            Testimonials from our past events
                        </p>
                    </motion.div>
                    <StaggerTestimonials />
                </div>
            </section>

            {/* Past Events - Clickable */}
            <section className="py-32 bg-black">
                <div className="container mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl font-bold text-white mb-12 text-center font-display"
                    >
                        Past <span className="text-green-500">Events</span>
                    </motion.h2>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {pastEvents.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => setSelectedEvent(event)}
                                className="relative group overflow-hidden rounded-xl cursor-pointer border-2 border-green-500/30 hover:border-green-500 transition-all"
                            >
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent group-hover:via-black/90 transition-all" />
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-white font-bold text-2xl mb-2 font-display">{event.title}</h3>
                                    <p className="text-green-400 text-sm font-semibold mb-2">{event.participants}+ Participants</p>
                                    <p className="text-neutral-300 text-sm">Click to view details →</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Event Details Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 overflow-y-auto"
                        onClick={() => setSelectedEvent(null)}
                    >
                        <div className="min-h-screen py-12 px-4">
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="max-w-6xl mx-auto bg-neutral-950 rounded-2xl border-2 border-green-500 p-8 md:p-12 relative"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="absolute top-4 right-4 p-2 bg-green-600 hover:bg-green-700 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-white" />
                                </button>

                                {/* Event Header */}
                                <div className="mb-8">
                                    <h2 className="text-5xl font-bold text-white mb-4 font-display">{selectedEvent.title}</h2>
                                    <div className="flex flex-wrap gap-4 text-neutral-300">
                                        <span className="flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-green-500" />
                                            {selectedEvent.date}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Users className="w-5 h-5 text-green-500" />
                                            {selectedEvent.participants}+ Participants
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-green-500" />
                                            {selectedEvent.venue}
                                        </span>
                                    </div>
                                </div>

                                {/* Winners Section */}
                                <div className="mb-12">
                                    <h3 className="text-3xl font-bold text-green-400 mb-6 flex items-center gap-3 font-display">
                                        <Trophy className="w-8 h-8" />
                                        Winners
                                    </h3>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        {selectedEvent.winners.map((winner, index) => (
                                            <div key={index} className="bg-black rounded-xl border border-green-500/30 p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <Award className="w-8 h-8 text-green-500" />
                                                    <span className="text-green-400 font-bold">{winner.prize}</span>
                                                </div>
                                                <img
                                                    src={winner.image}
                                                    alt={winner.team}
                                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                                />
                                                <h4 className="text-xl font-bold text-white mb-2">{winner.position}</h4>
                                                <h5 className="text-lg text-green-400 font-semibold mb-2">{winner.team}</h5>
                                                <ul className="text-neutral-400 text-sm space-y-1">
                                                    {winner.members.map((member, idx) => (
                                                        <li key={idx}>{member}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Event Gallery */}
                                <div>
                                    <h3 className="text-3xl font-bold text-green-400 mb-6 font-display">Event Gallery</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {selectedEvent.gallery.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                alt={`Event ${index + 1}`}
                                                className="w-full h-40 object-cover rounded-lg border border-green-500/30 hover:border-green-500 transition-all cursor-pointer"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-green-950/20 via-black to-black border-t border-green-500/30">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-display">
                            Don't Miss <span className="text-green-500">Out!</span>
                        </h2>
                        <p className="text-xl text-neutral-300 mb-8">
                            Stay updated with our latest events and workshops
                        </p>
                        <motion.a
                            href="/contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block px-12 py-5 bg-green-600 text-white text-lg font-bold rounded-full hover:bg-green-700 transition-all duration-300 shadow-lg shadow-green-600/50 border-2 border-green-500"
                        >
                            Subscribe to Updates →
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Events;
