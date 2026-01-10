import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { motion } from 'framer-motion';
import { Upload, Check, AlertCircle, Camera, User } from 'lucide-react';
import { uploadMemberPhoto } from '../../services/memberPhotoService';
import { fetchTeamMembers } from '../../services/teamService';

const UpdatePhoto = () => {
    const [email, setEmail] = useState('');
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [validEmails, setValidEmails] = useState(new Set());
    const [verifying, setVerifying] = useState(true);

    useEffect(() => {
        const loadEmails = async () => {
            try {
                const members = await fetchTeamMembers();
                const emails = new Set(members.map(m => m.email.toLowerCase()));
                setValidEmails(emails);
            } catch (err) {
                console.error("Failed to load team list", err);
            } finally {
                setVerifying(false);
            }
        };
        loadEmails();
    }, []);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.size > 5 * 1024 * 1024) {
                setError('File size must be less than 5MB');
                return;
            }
            if (!selectedFile.type.startsWith('image/')) {
                setError('Please select an image file');
                return;
            }
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim()) {
            setError('Please enter your email');
            return;
        }
        if (!email.includes('@')) {
            setError('Please enter a valid email');
            return;
        }

        // Email existence check
        if (!validEmails.has(email.toLowerCase().trim())) {
            setError('Email not found in team list. Please use the exact email from the registration form.');
            return;
        }
        if (!file) {
            setError('Please select a photo');
            return;
        }

        setLoading(true);
        const result = await uploadMemberPhoto(email, file);
        setLoading(false);

        if (result.success) {
            setSuccess(true);
        } else {
            setError(result.error || 'Upload failed. Please try again.');
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-black text-white">
                <Navbar />
                <div className="container mx-auto px-4 py-32 flex items-center justify-center min-h-[80vh]">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center max-w-md"
                    >
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-10 h-10 text-black" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4 font-display">Photo Updated!</h2>
                        <p className="text-neutral-400 mb-8">
                            Your photo has been uploaded successfully. It will appear on the Team page shortly.
                        </p>
                        <a
                            href="/team"
                            className="inline-block px-8 py-3 bg-green-500 text-black font-bold rounded-full hover:bg-green-400 transition-colors"
                        >
                            View Team Page
                        </a>
                    </motion.div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="container mx-auto px-4 py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-lg mx-auto"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
                            Update Your <span className="text-green-500">Photo</span>
                        </h1>
                        <p className="text-neutral-400">
                            Upload your professional photo for the E-Cell team page
                        </p>
                    </div>

                    {/* Important Notice */}
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                        <p className="text-yellow-400 text-sm font-medium text-center">
                            ⚠️ Use the <strong>exact same email</strong> you entered in the E-Cell recruitment form.
                            If emails don't match, your photo won't appear on the team page.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">
                                Your Email (same as in the form)
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your.email@srmist.edu.in"
                                    className="w-full pl-12 pr-4 py-4 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:border-green-500 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* Photo Upload */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">
                                Your Photo
                            </label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${preview
                                    ? 'border-green-500 bg-green-500/5'
                                    : 'border-neutral-700 hover:border-neutral-600 hover:bg-neutral-900/50'
                                    }`}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />

                                {preview ? (
                                    <div className="space-y-4">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-green-500"
                                        />
                                        <p className="text-green-400 text-sm">Click to change photo</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto">
                                            <Camera className="w-8 h-8 text-neutral-500" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">Click to upload</p>
                                            <p className="text-neutral-500 text-sm">PNG, JPG up to 5MB</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm">{error}</p>
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || !email || !file}
                            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${loading || !email || !file
                                ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                                : 'bg-green-500 text-black hover:bg-green-400'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-5 h-5" />
                                    Upload Photo
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-neutral-600 text-sm mt-8">
                        Use the same email you used when filling the E-Cell form
                    </p>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default UpdatePhoto;
