import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { motion } from "framer-motion";
import { Upload, Send, User, Mail, Phone, Briefcase, FileText, Lightbulb, CheckCircle, Users, TrendingUp, Rocket, Hash, Loader2, AlertCircle, GraduationCap } from "lucide-react";
import { submitApplication } from "../../services/recruitmentService";

const Recruitments = () => {
  // Form state with SRM default for college
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    registrationNumber: "",
    college: "SRM Institute of Science and Technology",
    year: "",
    domain: "",
    resume: null,
    ideaTitle: "",
    ideaDescription: "",
    teamMembers: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Name: only allow letters and spaces
    if (name === "fullName") {
      const sanitized = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData(prev => ({ ...prev, [name]: sanitized }));
    }
    // Phone: only allow numbers
    else if (name === "phone") {
      const sanitized = value.replace(/[^0-9]/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: sanitized }));
    }
    // Registration number: auto uppercase
    else if (name === "registrationNumber") {
      setFormData(prev => ({ ...prev, [name]: value.toUpperCase() }));
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setError("Resume file must be less than 5MB");
      return;
    }
    setFormData(prev => ({ ...prev, resume: file }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await submitApplication(formData);

      if (result.success) {
        setSubmitted(true);
        // Success screen stays - no auto-reset
      } else {
        setError(result.error || "Failed to submit application. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const domains = [
    "Technical",
    "Marketing",
    "Corporate Relations",
    "Creatives & Design",
    "Content Writing",
    "Event Management",
  ];

  const years = [
    { value: "1st Year", label: "1st Year", icon: "🎓" },
    { value: "2nd Year", label: "2nd Year", icon: "📚" },
    { value: "3rd Year", label: "3rd Year", icon: "💡" },
    { value: "4th Year", label: "4th Year", icon: "🚀" },
    { value: "Post Graduate", label: "PG", icon: "🎯" },
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

      {/* Form Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 max-w-4xl">
          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-neutral-950 border border-green-500 rounded-2xl p-12 text-center"
            >
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-4 font-display">Application Submitted!</h2>
              <p className="text-neutral-300 text-xl">
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
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/50 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="text-red-400">
                      <p className="font-semibold mb-2">Please fix the following:</p>
                      <ul className="space-y-1">
                        {error.split(', ').map((err, idx) => (
                          <li key={idx} className="text-sm">{err}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

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
                      disabled={isLoading}
                      className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors disabled:opacity-50"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 mb-2 font-medium">Registration Number *</label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-3.5 w-5 h-5 text-green-500" />
                      <input
                        type="text"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        required
                        maxLength={15}
                        disabled={isLoading}
                        className="w-full pl-12 pr-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors disabled:opacity-50 uppercase"
                        placeholder="RA2311003012103"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-neutral-300 mb-2 font-medium">SRM Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-5 h-5 text-green-500" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="w-full pl-12 pr-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors disabled:opacity-50"
                        placeholder="example@srmist.edu.in"
                      />
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">Use your @srmist.edu.in email</p>
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
                        maxLength={10}
                        disabled={isLoading}
                        className="w-full pl-12 pr-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors disabled:opacity-50"
                        placeholder="10 digit number"
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
                      disabled={isLoading}
                      className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors disabled:opacity-50"
                      placeholder="SRM Institute of Science and Technology"
                    />
                  </div>

                  {/* Year of Study - Modern Styled Dropdown */}
                  <div>
                    <label className="block text-neutral-300 mb-2 font-medium">Year of Study *</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-3.5 w-5 h-5 text-green-500" />
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="w-full pl-12 pr-10 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors appearance-none disabled:opacity-50 cursor-pointer"
                      >
                        <option value="" disabled>Select your year</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="Post Graduate">Post Graduate</option>
                      </select>
                      {/* Custom dropdown arrow */}
                      <div className="absolute right-3 top-3.5 pointer-events-none">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-neutral-300 mb-2 font-medium">Preferred Domain *</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3.5 w-5 h-5 text-green-500" />
                      <select
                        name="domain"
                        value={formData.domain}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="w-full pl-12 pr-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors appearance-none disabled:opacity-50"
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
                <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors group cursor-pointer ${formData.resume ? 'border-green-500/60 bg-green-500/5' : 'border-green-500/30 hover:border-green-500/60'}`}>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    disabled={isLoading}
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
                      disabled={isLoading}
                      className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors disabled:opacity-50"
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
                      disabled={isLoading}
                      className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors resize-none disabled:opacity-50"
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
                      disabled={isLoading}
                      className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors disabled:opacity-50"
                      placeholder="Names of your co-founders or team members"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                disabled={isLoading}
                className="w-full px-8 py-5 bg-green-600 text-white text-lg font-bold rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-green-600/30 border-2 border-green-500 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Send className="w-5 h-5" />
                  </>
                )}
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
