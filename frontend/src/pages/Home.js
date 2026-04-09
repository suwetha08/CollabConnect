import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find the Perfect Project Partner <span>Based on Skills</span></h1>
          <p>Connect with talented students, collaborate on real projects, and build your portfolio together.</p>
          <div className="hero-buttons">
            <Link to="/browse" className="btn-primary">Browse Projects</Link>
            {user
              ? <Link to="/post" className="btn-secondary">Post a Project</Link>
              : <Link to="/auth" className="btn-secondary">Get Started</Link>
            }
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="hc-skill">React</div>
            <div className="hc-skill">Python</div>
            <div className="hc-skill">UI/UX</div>
            <div className="hc-skill">Node.js</div>
            <div className="hc-skill">Data Science</div>
            <div className="hc-skill">AWS</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Why CollabConnect?</h2>
        <div className="features-grid">
          {[
            { icon: '🎯', title: 'Skill Matching', desc: 'Find partners with the exact skills your project needs using our smart matching algorithm.' },
            { icon: '🤝', title: 'Easy Collaboration', desc: 'Apply to projects, get accepted, and start building amazing things together.' },
            { icon: '🔍', title: 'Smart Search', desc: 'Filter projects by multiple skills simultaneously to find the perfect fit.' },
            { icon: '📈', title: 'Build Portfolio', desc: 'Work on real projects and showcase your collaborative experience.' }
          ].map((f, i) => (
            <div key={i} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="cta">
          <h2>Ready to Collaborate?</h2>
          <p>Join thousands of students building projects together.</p>
          <Link to="/auth" className="btn-primary">Join Now — It's Free</Link>
        </section>
      )}
    </div>
  );
};

export default Home;
