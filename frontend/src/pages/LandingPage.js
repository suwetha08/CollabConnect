import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const FEATURES = [
  { icon: '🎯', title: 'Skill Matching',      desc: 'Intelligent algorithm matches you with projects that align with your skills.' },
  { icon: '🤝', title: 'Easy Collaboration',  desc: 'Connect with teammates, share ideas, and build amazing things together.' },
  { icon: '🔍', title: 'Smart Search',        desc: 'Advanced filtering helps you discover the perfect projects and partners.' },
  { icon: '⚡', title: 'Fast Applications',   desc: 'Apply to projects in one click and track your application status live.' },
  { icon: '🛡️', title: 'Secure Auth',         desc: 'JWT + Google OAuth keeps your account safe and sign-in seamless.' },
  { icon: '📊', title: 'Personal Dashboard',  desc: 'Track your projects, applications, and recommendations in one place.' },
];

const STATS = [
  { value: '1,200+', label: 'Active Students' },
  { value: '600+',   label: 'Projects Posted' },
  { value: '50+',    label: 'Skills Covered' },
  { value: '94%',    label: 'Match Rate' },
];

const LandingPage = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">

      {/* ── Navbar strip ── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 sm:px-10 justify-between bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-glow">
            <span className="text-white font-bold text-xs">CC</span>
          </div>
          <span className="font-bold text-base bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">CollabConnect</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Login</Link>
          <Link to="/signup" className="px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors">
            Get Started
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-950" />
        {/* Animated blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-blob delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl animate-blob delay-4000" />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300 text-sm font-medium mb-8 animate-fade-up">
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse-slow" />
            Student Collaboration Platform
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6 animate-fade-up delay-100">
            Where Skills Meet
            <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Opportunity
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up delay-200">
            Find the perfect project partner based on skills. Connect with talented students and build impressive projects together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-300">
            <Link to="/signup"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-2xl shadow-glow hover:shadow-glow-lg hover:scale-[1.03] transition-all duration-200 text-base">
              Get Started Free →
            </Link>
            <Link to="/login"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-2xl transition-all duration-200 text-base">
              Sign In
            </Link>
          </div>

          {/* Floating preview cards */}
          <div className="mt-20 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto animate-fade-up delay-400">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-left hover:bg-white/8 hover:border-white/20 transition-all duration-300 animate-float">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-sm">A</div>
                <div>
                  <p className="text-sm font-semibold text-white">Alex Chen</p>
                  <p className="text-xs text-slate-400">Full Stack Developer</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['React', 'Node.js', 'Python'].map(s => (
                  <span key={s} className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full text-xs">{s}</span>
                ))}
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-left hover:bg-white/8 hover:border-white/20 transition-all duration-300 animate-float delay-2000">
              <p className="text-sm font-semibold text-white mb-1">🎨 UI/UX Design System</p>
              <p className="text-xs text-slate-400 mb-3">Looking for 2 designers</p>
              <div className="flex flex-wrap gap-1.5">
                {['Figma', 'UI/UX', 'Tailwind'].map(s => (
                  <span key={s} className="px-2 py-0.5 bg-violet-500/20 text-violet-300 rounded-full text-xs">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{value}</p>
              <p className="text-sm text-slate-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Everything you need to collaborate</h2>
            <p className="text-slate-400 max-w-xl mx-auto">A complete platform built for students who want to build real things with real people.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title}
                className="group p-6 bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-indigo-500/30 rounded-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-11 h-11 bg-indigo-500/10 group-hover:bg-indigo-500/20 rounded-xl flex items-center justify-center text-2xl mb-4 transition-colors">
                  {icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative p-12 bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border border-indigo-500/20 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-violet-600/10 blur-xl" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to start building?</h2>
              <p className="text-slate-400 mb-8">Join thousands of students already collaborating on CollabConnect.</p>
              <Link to="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-2xl shadow-glow hover:shadow-glow-lg hover:scale-[1.03] transition-all duration-200">
                Create Free Account →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 border-t border-white/5 text-center text-slate-500 text-sm">
        © 2024 CollabConnect — Where skills meet opportunity 🚀
      </footer>
    </div>
  );
};

export default LandingPage;
