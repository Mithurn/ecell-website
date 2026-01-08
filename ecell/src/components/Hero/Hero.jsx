import { Link } from 'react-router-dom';
import './Hero.css';
import { SparklesPreview } from '../SparklesPreview/SparklesPreview';

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <SparklesPreview />
        <p className="hero-description text-green-500/60">
          E-Cell SRMIST is a student-run entrepreneurial organization,
          <br />
          official under the C.Tech department under the SCO
        </p>
        <Link to="/team" className="hero-team-button">
          meet our team
        </Link>
      </div>
    </div>
  );
};

export default Hero;
