import { Mail, MapPin, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-black border-t border-green-500/20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-green-500 font-display">E-Cell SRMIST</h3>
            <p className="text-neutral-400 font-sans leading-relaxed max-w-md">
              A student-run entrepreneurial organization officially recognized by the C.Tech department and the SCO.
              Fostering innovation and leadership at SRM Institute of Science & Technology.
            </p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white font-display uppercase tracking-wider">Connect</h4>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:ecell@srmist.edu.in"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-green-500/20 
                    text-neutral-400 hover:text-white hover:border-green-500/60 hover:bg-green-500/10
                    hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300 group"
                >
                  <Mail className="w-4 h-4 group-hover:text-green-400" />
                  <span className="text-sm font-medium">Email</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/e-cell-srmist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-green-500/20 
                    text-neutral-400 hover:text-white hover:border-green-500/60 hover:bg-green-500/10
                    hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300 group"
                >
                  <Linkedin className="w-4 h-4 group-hover:text-green-400" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/ecell_srmist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-green-500/20 
                    text-neutral-400 hover:text-white hover:border-green-500/60 hover:bg-green-500/10
                    hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300 group"
                >
                  <Instagram className="w-4 h-4 group-hover:text-green-400" />
                  <span className="text-sm font-medium">Instagram</span>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white font-display uppercase tracking-wider">Location</h4>
              <div className="text-neutral-400 space-y-1 font-sans">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 text-neutral-500 shrink-0" />
                  <div>
                    <p>Tech Park, SRM Institute of Science & Technology</p>
                    <p>SRM Nagar, Kattankulathur</p>
                    <p>Tamil Nadu (603202), India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-900 pt-8 text-center">
          <p className="text-neutral-500 text-sm font-sans">
            © {new Date().getFullYear()} E-Cell SRMIST. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
