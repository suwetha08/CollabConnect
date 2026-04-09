import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { applicationsAPI } from '../api';
import { useAuth } from '../context/AuthContext';

/* Rotating palette for skill chips */
const CHIP_STYLES = [
  'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-200 dark:ring-indigo-500/20',
  'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 ring-1 ring-violet-200 dark:ring-violet-500/20',
  'bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 ring-1 ring-sky-200 dark:ring-sky-500/20',
  'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-500/20',
  'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-200 dark:ring-amber-500/20',
];

/* Deterministic color from first letter */
const AVATAR_COLORS = [
  'from-indigo-500 to-violet-600',
  'from-sky-500 to-indigo-500',
  'from-violet-500 to-purple-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-500',
];
const avatarColor = (name = '') =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

const ProjectCard = ({ project }) => {
  const { user } = useAuth();
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState('');
  const isOwner = user && user.id === project.createdBy;

  const handleApply = async () => {
    setApplying(true); setError('');
    try {
      await applicationsAPI.apply(project.id);
      setApplied(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setApplying(false);
    }
  };

  const ownerInitial = project.owner?.name?.charAt(0).toUpperCase() ?? '?';

  return (
    <article className="
      group relative flex flex-col
      bg-white dark:bg-[#13151c]
      border border-slate-200/80 dark:border-white/[0.07]
      rounded-2xl overflow-hidden
      shadow-[0_2px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)]
      hover:shadow-[0_8px_32px_rgba(99,102,241,0.12)] dark:hover:shadow-[0_8px_32px_rgba(99,102,241,0.18)]
      hover:border-indigo-300/60 dark:hover:border-indigo-500/30
      hover:-translate-y-0.5
      transition-all duration-300
    ">
      {/* Top accent bar — appears on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex flex-col gap-3.5 p-5 flex-1">

        {/* ── Header row ── */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[15px] font-semibold text-slate-900 dark:text-slate-100 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 line-clamp-2">
            {project.title}
          </h3>
          {/* Team size pill */}
          <span className="flex-shrink-0 flex items-center gap-1 text-[11px] font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/[0.05] px-2 py-1 rounded-md whitespace-nowrap">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {project.teamSize}
          </span>
        </div>

        {/* ── Description ── */}
        <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* ── Skill chips ── */}
        {project.skillsRequired?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.skillsRequired.slice(0, 5).map((skill, i) => (
              <span key={i} className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${CHIP_STYLES[i % CHIP_STYLES.length]}`}>
                {skill}
              </span>
            ))}
            {project.skillsRequired.length > 5 && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/[0.05]">
                +{project.skillsRequired.length - 5}
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100 dark:border-white/[0.06] bg-slate-50/60 dark:bg-white/[0.02]">
        {/* Owner */}
        <div className="flex items-center gap-2 min-w-0">
          <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${avatarColor(project.owner?.name)} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
            {ownerInitial}
          </div>
          <span className="text-[12px] text-slate-400 dark:text-slate-500 truncate max-w-[90px]">
            {project.owner?.name}
          </span>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link to={`/projects/${project.id}`}
            className="px-3 py-1.5 text-[12px] font-semibold text-slate-600 dark:text-slate-400 bg-white dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.08] rounded-lg hover:border-indigo-300 dark:hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200">
            Details
          </Link>

          {user && !isOwner && (
            applied ? (
              <span className="flex items-center gap-1 px-3 py-1.5 text-[12px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Applied
              </span>
            ) : (
              <button onClick={handleApply} disabled={applying}
                className="px-3 py-1.5 text-[12px] font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-[0_0_12px_rgba(99,102,241,0.4)]">
                {applying ? (
                  <span className="flex items-center gap-1.5">
                    <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Applying
                  </span>
                ) : 'Apply →'}
              </button>
            )
          )}
        </div>
      </div>

      {error && (
        <p className="px-5 pb-3 text-[11px] text-red-500 dark:text-red-400">{error}</p>
      )}
    </article>
  );
};

export default ProjectCard;
