import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { motion } from "framer-motion";
import { Upload, Send, User, Mail, Phone, Briefcase, FileText, Lightbulb, CheckCircle, Users, TrendingUp, Rocket } from "lucide-react";

const Recruitments = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    year: "",
    domain: "",
    resume: null,
    ideaTitle: "",
    ideaDescription: "",
    teamMembers: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        college: "",
        year: "",
        domain: "",
        resume: null,
        ideaTitle: "",
        ideaDescription: "",
        teamMembers: "",
      });
    }, 3000);
  };

  const domains = [
    "Technical",
    "Marketing",
    "Corporate Relations",
    "Creatives & Design",
    "Content Writing",
    "Event Management",
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
            <h1 className="text-6xl md:text-8xl font-bold mb-6 font-display text-white">
              Join <span className="text-green-500">E-Cell</span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto mb-8">
              Be part of India's most vibrant entrepreneurship community. Whether you want to join our team or pitch your startup idea, we're here to support you!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 max-w-4xl">
          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-green-950/30 to-emerald-950/30 border-2 border-green-500 rounded-2xl p-12 text-center"
            >
              <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-4 font-display">
                Application Submitted!
              </h2>
              <p className="text-xl text-neutral-300">
                Thank you for your interest. We'll review your application and get back to you soon!
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-neutral-950 border border-green-500/20 rounded-2xl p-8 md:p-12 space-y-8"
            >
              {/* Personal Information */}
              <div>
                <h2 className="text-3xl font-bold text-green-400 mb-6 font-display flex items-center gap-3">
                  <User className="w-8 h-8" />
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-neutral-300 mb-2 font-medium">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 mb-2 font-medium">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-5 h-5 text-green-500" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
                        placeholder="Enter your SRM email ID"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-neutral-300 mb-2 font-medium">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 w-5 h-5 text-green-500" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
                        placeholder="Enter your mobile number"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-neutral-300 mb-2 font-medium">College/University *</label>
                    <input
                      type="text"
                      name="college"
                      value={formData.college}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
                      placeholder="SRM Institute of Science and Technology"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 mb-2 font-medium">Year of Study *</label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
                    >
                      <option value="">Select Year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                      <option value="pg">Post Graduate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-neutral-300 mb-2 font-medium">Preferred Domain *</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3.5 w-5 h-5 text-green-500" />
                      <select
                        name="domain"
                        value={formData.domain}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors appearance-none"
                      >
                        <option value="">Select Domain</option>
                        {domains.map((domain) => (
                          <option key={domain} value={domain}>{domain}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <h2 className="text-3xl font-bold text-green-400 mb-6 font-display flex items-center gap-3">
                  <FileText className="w-8 h-8" />
                  Upload Your Resume
                </h2>
                <div className="border-2 border-dashed border-green-500/30 hover:border-green-500/60 rounded-lg p-8 text-center transition-colors group cursor-pointer">
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="resume" className="cursor-pointer">
                    <Upload className="w-16 h-16 text-green-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-white font-semibold mb-2">
                      {formData.resume ? formData.resume.name : "Click to upload your resume"}
                    </p>
                    <p className="text-neutral-400 text-sm">PDF, DOC, or DOCX (Max 5MB)</p>
                  </label>
                </div>
              </div>

              {/* Pitch Your Idea */}
              <div>
                <h2 className="text-3xl font-bold text-green-400 mb-6 font-display flex items-center gap-3">
                  <Lightbulb className="w-8 h-8" />
                  Pitch Your Startup Idea (Optional)
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-neutral-300 mb-2 font-medium">Idea Title</label>
                    <input
                      type="text"
                      name="ideaTitle"
                      value={formData.ideaTitle}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
                      placeholder="Your innovative startup idea name"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 mb-2 font-medium">Describe Your Idea</label>
                    <textarea
                      name="ideaDescription"
                      value={formData.ideaDescription}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors resize-none"
                      placeholder="Tell us about your startup idea, the problem it solves, and how you plan to execute it..."
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 mb-2 font-medium">Team Members (if any)</label>
                    <input
                      type="text"
                      name="teamMembers"
                      value={formData.teamMembers}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
                      placeholder="Names of your co-founders or team members"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-5 bg-green-600 text-white text-lg font-bold rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-green-600/30 border-2 border-green-500"
              >
                Submit Application
                <Send className="w-5 h-5" />
              </motion.button>
            </motion.form>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-black to-neutral-950 border-y border-green-500/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16 font-display">
            Why Join <span className="text-green-500">E-Cell?</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Learn from the Best",
                description: "Get mentored by successful entrepreneurs and industry leaders",
                icon: <Users className="w-16 h-16 mb-4 text-green-400" />
              },
              {
                title: "Build Your Network",
                description: "Connect with 5000+ like-minded innovators and potential co-founders",
                icon: <TrendingUp className="w-16 h-16 mb-4 text-green-400" />
              },
              {
                title: "Access to Resources",
                description: "Get access to funding, workspace, and cutting-edge tools",
                icon: <Rocket className="w-16 h-16 mb-4 text-green-400" />
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-950 border border-green-500/20 hover:border-green-500/50 rounded-xl p-8 text-center group transition-all"
              >
                <div className="flex justify-center group-hover:scale-110 transition-transform">{benefit.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3 font-display">{benefit.title}</h3>
                <p className="text-neutral-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Recruitments;
