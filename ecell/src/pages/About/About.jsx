import './About.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const About = () => {
  return (
    <div className="about-page">
      <Navbar />
      <div className="about-container">
        <div className="about-header">
          <h1 className="about-title">who are we</h1>
          <div className="about-divider" />
          <img
            src="https://res.cloudinary.com/dsxpqhyrv/image/upload/v1737885321/2b9f9fab-6ac7-403f-8897-8b0cd6b844b2.png"
            alt="E-Cell SRMIST"
            className="about-hero-image"
          />
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2 className="section-title">our story</h2>
            <p className="section-text">
              E-Cell SRMIST is a student-run entrepreneurial organization operating under the C.Tech department
              under the SCO. We are a vibrant community of innovators, creators, and future leaders dedicated
              to fostering entrepreneurship and innovation on campus.
            </p>
          </section>

          <section className="about-section">
            <h2 className="section-title">our mission</h2>
            <p className="section-text">
              To cultivate an entrepreneurial mindset among students by providing them with the resources,
              mentorship, and platform to transform their ideas into reality. We believe in nurturing creativity,
              encouraging collaboration, and building a sustainable ecosystem for startups.
            </p>
          </section>

          <section className="about-section">
            <h2 className="section-title">what we do</h2>
            <div className="activities-grid">
              <div className="activity-item">
                <div className="activity-number">01</div>
                <h3 className="activity-title">workshops & events</h3>
                <p className="activity-text">
                  Regular workshops, seminars, and networking events with industry leaders and successful entrepreneurs.
                </p>
              </div>
              <div className="activity-item">
                <div className="activity-number">02</div>
                <h3 className="activity-title">mentorship programs</h3>
                <p className="activity-text">
                  One-on-one guidance from experienced entrepreneurs and industry experts to help refine your business ideas.
                </p>
              </div>
              <div className="activity-item">
                <div className="activity-number">03</div>
                <h3 className="activity-title">startup incubation</h3>
                <p className="activity-text">
                  Comprehensive support for early-stage startups including workspace, resources, and funding opportunities.
                </p>
              </div>
              <div className="activity-item">
                <div className="activity-number">04</div>
                <h3 className="activity-title">pitch competitions</h3>
                <p className="activity-text">
                  Regular competitions where students can pitch their ideas to win funding and recognition.
                </p>
              </div>
              <div className="activity-item">
                <div className="activity-number">05</div>
                <h3 className="activity-title">networking events</h3>
                <p className="activity-text">
                  Connect with fellow entrepreneurs, investors, and industry professionals to expand your network.
                </p>
              </div>
              <div className="activity-item">
                <div className="activity-number">06</div>
                <h3 className="activity-title">skill development</h3>
                <p className="activity-text">
                  Hands-on training in technical, creative, and business skills essential for entrepreneurship.
                </p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2 className="section-title">our vision</h2>
            <p className="section-text">
              To be recognized as India's leading student-run entrepreneurship cell, creating a sustainable ecosystem
              where innovation thrives, ideas flourish, and every aspiring entrepreneur finds the support needed to
              build world-class startups that solve real-world problems.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
