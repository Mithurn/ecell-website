import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Twitter } from "lucide-react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted:", formData);
        alert("Thank you for reaching out! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const contactInfo = [
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email",
            info: "ecell@srmist.edu.in",
            link: "mailto:ecell@srmist.edu.in"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Phone",
            info: "+91 98765 43210",
            link: "tel:+919876543210"
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Location",
            info: "SRM Institute of Science and Technology, Kattankulathur",
            link: "#"
        }
    ];

    const socialLinks = [
        { icon: <Instagram className="w-6 h-6" />, name: "Instagram", link: "#", color: "from-pink-500 to-purple-600" },
        { icon: <Linkedin className="w-6 h-6" />, name: "LinkedIn", link: "#", color: "from-blue-500 to-blue-700" },
        { icon: <Twitter className="w-6 h-6" />, name: "Twitter", link: "#", color: "from-sky-400 to-blue-600" },
    ];

    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-b from-black to-neutral-950">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
                            Get In Touch
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-12 bg-neutral-950">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {contactInfo.map((item, index) => (
                            <motion.a
                                key={index}
                                href={item.link}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="flex flex-col items-center p-6 bg-neutral-900/50 rounded-xl border border-neutral-700 hover:border-green-500/50 transition-all duration-300 group"
                            >
                                <div className="w-14 h-14 rounded-full bg-green-600/20 flex items-center justify-center text-green-500 mb-4 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                                <p className="text-neutral-400 text-center text-sm">{item.info}</p>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Map */}
            <section className="py-20 bg-gradient-to-b from-neutral-950 to-neutral-900">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-neutral-800/50 p-8 md:p-10 rounded-2xl border border-neutral-700"
                        >
                            <h2 className="text-4xl font-bold text-white mb-6">Send Us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-neutral-300 mb-2 font-medium">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-neutral-300 mb-2 font-medium">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-neutral-300 mb-2 font-medium">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
                                        placeholder="What is this about?"
                                    />
                                </div>
                                <div>
                                    <label className="block text-neutral-300 mb-2 font-medium">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors resize-none"
                                        placeholder="Your message..."
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-600/30"
                                >
                                    Send Message
                                    <Send className="w-5 h-5" />
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Map & Social Links */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            {/* Map */}
                            <div className="bg-neutral-800/50 p-4 rounded-2xl border border-neutral-700 h-96 overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.058783896516!2d80.04127831482204!3d12.973941890854535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d5f0ee6a503%3A0xdb5d02f5949b1d44!2sSRM%20Institute%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sin!4v1234567890123"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, borderRadius: '12px' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="SRM IST Location"
                                />
                            </div>

                            {/* Social Links */}
                            <div className="bg-neutral-800/50 p-8 rounded-2xl border border-neutral-700">
                                <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
                                <div className="flex gap-4">
                                    {socialLinks.map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href={social.link}
                                            whileHover={{ scale: 1.1, y: -5 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`w-14 h-14 rounded-full bg-gradient-to-br ${social.color} flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
                                            aria-label={social.name}
                                        >
                                            {social.icon}
                                        </motion.a>
                                    ))}
                                </div>
                                <div className="mt-8 pt-8 border-t border-neutral-700">
                                    <h4 className="text-lg font-semibold text-white mb-3">Office Hours</h4>
                                    <p className="text-neutral-400 mb-2">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                    <p className="text-neutral-400">Saturday: 10:00 AM - 4:00 PM</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-neutral-900">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl font-bold text-white mb-8 text-center">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {[
                                { q: "How can I join E-Cell SRMIST?", a: "Visit our Recruitments page and fill out the application form. We conduct recruitment drives every semester." },
                                { q: "Do I need to have a startup idea to join?", a: "No! We welcome all students interested in entrepreneurship, whether you have an idea or just want to learn." },
                                { q: "Are the events open to all students?", a: "Yes, most of our events are open to all SRMIST students. Some workshops may have limited seats." },
                            ].map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-700"
                                >
                                    <h3 className="text-lg font-semibold text-green-400 mb-2">{faq.q}</h3>
                                    <p className="text-neutral-300">{faq.a}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
