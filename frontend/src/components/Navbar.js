import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../App';

const NAV_LINKS = [
  { to: '/browse',    label: 'Browse',       icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  { to: '/post',      label: 'Post Project', icon: 'M12 4v16m8-8H4' },
  { to: '/dashboard', label: 'Dashboard',    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { to: '/profile',   label: 'Profile',      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
];

const Icon = ({ d, className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={d} />
  </svg>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => { logout(); setMenuOpen(false); navigate('/'); };
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[60px] bg-white/90 dark:bg-[#0d0f14]/90 backdrop-blur-2xl border-b border-slate-200/80 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">

        {/* ── Logo ── */}
        <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.7)] transition-shadow duration-300">
            <span className="text-white font-black text-[11px] tracking-tight">CC</span>
          </div>
          <span className="font-bold text-[15px] text-slate-900 dark:text-white hidden sm:block tracking-tight">
            Collab<span className="text-indigo-500">Connect</span>
          </span>
        </Link>

        {/* ── Desktop center nav ── */}
        {user && (
          <div className="hidden md:flex items-center gap-0.5 bg-slate-100/80 dark:bg-white/[0.05] rounded-xl p-1 border border-slate-200/60 dark:border-white/[0.06]">
            {NAV_LINKS.map(({ to, label, icon }) => (
              <Link key={to} to={to}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  isActive(to)
                    ? 'bg-white dark:bg-white/10 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/60 dark:hover:bg-white/[0.06]'
                }`}>
                <Icon d={icon} className="w-3.5 h-3.5" />
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* ── Right side ── */}
        <div className="hidden md:flex items-center gap-2">
          {/* Dark mode toggle */}
          <button onClick={toggle}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-slate-700 dark:hover:text-slate-300 transition-all duration-200">
            {dark
              ? <Icon d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              : <Icon d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            }
          </button>

          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-white/[0.08]">
              {/* Avatar + name */}
              <div className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-default">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300 max-w-[80px] truncate">
                  {user.name?.split(' ')[0]}
                </span>
              </div>
              <button onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all duration-200">
                <Icon d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-3.5 py-1.5 text-[13px] font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Sign in
              </Link>
              <Link to="/signup" className="px-4 py-1.5 text-[13px] font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm">
                Get started
              </Link>
            </div>
          )}
        </div>

        {/* ── Mobile right ── */}
        <div className="md:hidden flex items-center gap-1.5">
          <button onClick={toggle} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors">
            {dark ? <Icon d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /> : <Icon d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors">
            <Icon d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} className="w-4.5 h-4.5 text-slate-700 dark:text-slate-300" />
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="md:hidden absolute top-[60px] left-0 right-0 bg-white dark:bg-[#0d0f14] border-b border-slate-200 dark:border-white/[0.06] shadow-2xl animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {user ? (
              <>
                <div className="flex items-center gap-3 p-3 mb-3 bg-slate-50 dark:bg-white/[0.04] rounded-xl border border-slate-200 dark:border-white/[0.06]">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>
                </div>
                {NAV_LINKS.map(({ to, label, icon }) => (
                  <Link key={to} to={to} onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive(to)
                        ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                    }`}>
                    <Icon d={icon} className="w-4 h-4" />
                    {label}
                  </Link>
                ))}
                <div className="pt-2 mt-2 border-t border-slate-100 dark:border-white/[0.06]">
                  <button onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors">
                    <Icon d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] rounded-xl">Sign in</Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-xl">Get started →</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
