import React, { useState, useEffect, useCallback } from 'react';
import { projectsAPI } from '../api';
import ProjectCard from '../components/ProjectCard';

const POPULAR_SKILLS = ['React', 'Python', 'Node.js', 'UI/UX', 'Machine Learning', 'Flutter'];

const SkeletonCard = () => (
  <div className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#13151c] p-5 space-y-3">
    <div className="flex justify-between">
      <div className="skeleton h-4 w-2/3 rounded-lg" />
      <div className="skeleton h-5 w-10 rounded-md" />
    </div>
    <div className="skeleton h-3 w-full rounded" />
    <div className="skeleton h-3 w-4/5 rounded" />
    <div className="flex gap-2 pt-1">
      <div className="skeleton h-5 w-14 rounded-md" />
      <div className="skeleton h-5 w-16 rounded-md" />
      <div className="skeleton h-5 w-12 rounded-md" />
    </div>
    <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-white/[0.05]">
      <div className="skeleton h-4 w-20 rounded" />
      <div className="flex gap-2">
        <div className="skeleton h-7 w-16 rounded-lg" />
        <div className="skeleton h-7 w-16 rounded-lg" />
      </div>
    </div>
  </div>
);

const Browse = () => {
  const [projects, setProjects]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [search, setSearch]         = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  const fetchProjects = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const parts = [];
      if (search)      parts.push(`search=${encodeURIComponent(search)}`);
      if (skillFilter) parts.push(`skills=${encodeURIComponent(skillFilter)}`);
      const data = await projectsAPI.getAll(parts.length ? `?${parts.join('&')}` : '');
      setProjects(data.projects ?? []);
    } catch { setError('Failed to load projects. Please try again.'); }
    finally { setLoading(false); }
  }, [search, skillFilter]);

  useEffect(() => {
    const t = setTimeout(fetchProjects, 380);
    return () => clearTimeout(t);
  }, [fetchProjects]);

  const hasFilters = search || skillFilter;
  const clearFilters = () => { setSearch(''); setSkillFilter(''); };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0b0f]">

      {/* ── Page header + search ── */}
      <div className="bg-white dark:bg-[#0d0f14] border-b border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

          {/* Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Browse Projects</h1>
            <p className="text-[13px] text-slate-400 dark:text-slate-500 mt-1">
              Discover projects that match your skills and interests
            </p>
          </div>

          {/* Search row */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search input */}
            <div className="relative flex-1">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-[14px] bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 outline-none transition-all"
              />
            </div>

            {/* Skill filter */}
            <div className="relative sm:w-64">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              <input
                type="text"
                placeholder="Filter by skill..."
                value={skillFilter}
                onChange={e => setSkillFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-[14px] bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 outline-none transition-all"
              />
            </div>
          </div>

          {/* Popular skill chips */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide">Popular:</span>
            {POPULAR_SKILLS.map(skill => (
              <button
                key={skill}
                onClick={() => setSkillFilter(skillFilter === skill ? '' : skill)}
                className={`px-2.5 py-1 rounded-lg text-[12px] font-medium transition-all duration-200 ${
                  skillFilter === skill
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-white/[0.05] text-slate-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}>
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-7">

        {/* Result meta row */}
        {!loading && !error && (
          <div className="flex items-center justify-between mb-5">
            <p className="text-[13px] text-slate-500 dark:text-slate-400">
              {projects.length > 0
                ? <><span className="font-semibold text-slate-700 dark:text-slate-300">{projects.length}</span> project{projects.length !== 1 ? 's' : ''} found</>
                : 'No results'
              }
              {hasFilters && <span className="text-slate-400 dark:text-slate-500"> for your filters</span>}
            </p>
            {hasFilters && (
              <button onClick={clearFilters}
                className="flex items-center gap-1.5 text-[12px] font-medium text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Loading grid */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-2xl mb-4">⚠️</div>
            <p className="text-[14px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Something went wrong</p>
            <p className="text-[13px] text-slate-400 mb-5">{error}</p>
            <button onClick={fetchProjects}
              className="px-4 py-2 text-[13px] font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors">
              Try again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/[0.05] flex items-center justify-center text-2xl mb-4">🔍</div>
            <p className="text-[14px] font-semibold text-slate-700 dark:text-slate-300 mb-1">No projects found</p>
            <p className="text-[13px] text-slate-400 mb-5">Try different keywords or remove your filters.</p>
            {hasFilters && (
              <button onClick={clearFilters}
                className="px-4 py-2 text-[13px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors">
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Results grid */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
