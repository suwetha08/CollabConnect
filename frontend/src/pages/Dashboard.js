import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsAPI, applicationsAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import ProjectCard from '../components/ProjectCard';

/* ── Status badge ── */
const STATUS = {
  PENDING:  { label: 'Pending',  cls: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-200 dark:ring-amber-500/20' },
  ACCEPTED: { label: 'Accepted', cls: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-500/20' },
  REJECTED: { label: 'Rejected', cls: 'bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400 ring-1 ring-red-200 dark:ring-red-500/20' },
};

/* ── Stat card ── */
const StatCard = ({ icon, label, value, delta, color }) => (
  <div className={`relative overflow-hidden rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${color.card}`}>
    {/* Background glow */}
    <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-20 ${color.glow}`} />
    <div className="relative flex items-start justify-between">
      <div>
        <p className="text-[12px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">{label}</p>
        <p className={`text-3xl font-extrabold tracking-tight ${color.value}`}>{value}</p>
        {delta !== undefined && (
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">{delta}</p>
        )}
      </div>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${color.icon}`}>
        {icon}
      </div>
    </div>
  </div>
);

/* ── Skeleton ── */
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
  </div>
);

const SkeletonStat = () => (
  <div className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#13151c] p-5">
    <div className="skeleton h-3 w-20 rounded mb-3" />
    <div className="skeleton h-8 w-12 rounded-lg" />
  </div>
);

/* ── Empty state ── */
const EmptyState = ({ icon, title, sub, linkTo, linkLabel }) => (
  <div className="flex flex-col items-center justify-center py-14 px-6 rounded-2xl border border-dashed border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02] text-center">
    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/[0.05] flex items-center justify-center text-2xl mb-4">
      {icon}
    </div>
    <p className="text-[14px] font-semibold text-slate-700 dark:text-slate-300 mb-1">{title}</p>
    <p className="text-[13px] text-slate-400 dark:text-slate-500 mb-5 max-w-[240px]">{sub}</p>
    {linkTo && (
      <Link to={linkTo}
        className="px-4 py-2 text-[13px] font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors shadow-sm">
        {linkLabel}
      </Link>
    )}
  </div>
);

/* ── Section header ── */
const SectionHeader = ({ title, sub, action }) => (
  <div className="flex items-center justify-between mb-5">
    <div>
      <h2 className="text-[16px] font-bold text-slate-900 dark:text-slate-100 tracking-tight">{title}</h2>
      {sub && <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-0.5">{sub}</p>}
    </div>
    {action}
  </div>
);

/* ── Main ── */
const Dashboard = () => {
  const { user } = useAuth();
  const [recommended, setRecommended] = useState([]);
  const [myProjects, setMyProjects]   = useState([]);
  const [myApps, setMyApps]           = useState([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    Promise.all([
      projectsAPI.getRecommended(),
      projectsAPI.getAll(),
      applicationsAPI.getMyApplications(),
    ]).then(([rec, all, apps]) => {
      setRecommended(rec.projects ?? []);
      setMyProjects((all.projects ?? []).filter(p => p.createdBy === user.id));
      setMyApps(apps.applications ?? []);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, [user.id]);

  const accepted = myApps.filter(a => a.status === 'ACCEPTED').length;
  const pending  = myApps.filter(a => a.status === 'PENDING').length;

  const STATS = [
    {
      icon: '📁', label: 'Projects Posted', value: myProjects.length,
      delta: 'Total projects you own',
      color: { card: 'bg-white dark:bg-[#13151c] border-slate-200 dark:border-white/[0.07]', glow: 'bg-indigo-400', icon: 'bg-indigo-50 dark:bg-indigo-500/10', value: 'text-slate-900 dark:text-slate-100' },
    },
    {
      icon: '📨', label: 'Applications Sent', value: myApps.length,
      delta: `${pending} pending review`,
      color: { card: 'bg-white dark:bg-[#13151c] border-slate-200 dark:border-white/[0.07]', glow: 'bg-violet-400', icon: 'bg-violet-50 dark:bg-violet-500/10', value: 'text-slate-900 dark:text-slate-100' },
    },
    {
      icon: '✅', label: 'Accepted', value: accepted,
      delta: myApps.length ? `${Math.round((accepted / myApps.length) * 100)}% success rate` : 'No applications yet',
      color: { card: 'bg-white dark:bg-[#13151c] border-slate-200 dark:border-white/[0.07]', glow: 'bg-emerald-400', icon: 'bg-emerald-50 dark:bg-emerald-500/10', value: 'text-emerald-600 dark:text-emerald-400' },
    },
    {
      icon: '🛠️', label: 'Skills', value: user.skills?.length ?? 0,
      delta: 'Listed on your profile',
      color: { card: 'bg-white dark:bg-[#13151c] border-slate-200 dark:border-white/[0.07]', glow: 'bg-amber-400', icon: 'bg-amber-50 dark:bg-amber-500/10', value: 'text-slate-900 dark:text-slate-100' },
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0b0f]">

      {/* ── Hero banner ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 dark:from-[#0a0b0f] to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-black text-base">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-indigo-200 text-[12px] font-medium">Welcome back 👋</p>
              <h1 className="text-white text-xl font-bold tracking-tight leading-tight">{user.name}</h1>
            </div>
          </div>
          <p className="text-indigo-200/80 text-[13px] max-w-md">
            Here's a snapshot of your activity on CollabConnect.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 pb-16 space-y-10">

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {loading
            ? Array(4).fill(0).map((_, i) => <SkeletonStat key={i} />)
            : STATS.map(s => <StatCard key={s.label} {...s} />)
          }
        </div>

        {/* ── Recommended ── */}
        <section>
          <SectionHeader
            title="Recommended for You"
            sub="Matched to your skill set"
            action={
              <Link to="/browse" className="flex items-center gap-1 text-[13px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors">
                View all
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            }
          />
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : recommended.length === 0 ? (
            <EmptyState icon="🎯" title="No recommendations yet" sub="Add skills to your profile to get matched with relevant projects." linkTo="/profile" linkLabel="Update Skills" />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommended.slice(0, 3).map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          )}
        </section>

        {/* ── Divider ── */}
        <div className="border-t border-slate-200 dark:border-white/[0.06]" />

        {/* ── My Projects ── */}
        <section>
          <SectionHeader
            title="My Projects"
            sub="Projects you've posted"
            action={
              <Link to="/post"
                className="flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors shadow-sm">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                New Project
              </Link>
            }
          />
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : myProjects.length === 0 ? (
            <EmptyState icon="📂" title="No projects yet" sub="Post your first project and start finding collaborators." linkTo="/post" linkLabel="Post a Project" />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {myProjects.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          )}
        </section>

        {/* ── Divider ── */}
        <div className="border-t border-slate-200 dark:border-white/[0.06]" />

        {/* ── My Applications ── */}
        <section>
          <SectionHeader title="My Applications" sub="Track your application status" />
          {loading ? (
            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#13151c] overflow-hidden divide-y divide-slate-100 dark:divide-white/[0.05]">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-4">
                  <div className="space-y-2">
                    <div className="skeleton h-3.5 w-44 rounded" />
                    <div className="skeleton h-3 w-28 rounded" />
                  </div>
                  <div className="skeleton h-6 w-20 rounded-full" />
                </div>
              ))}
            </div>
          ) : myApps.length === 0 ? (
            <EmptyState icon="📋" title="No applications yet" sub="Browse projects and apply to ones that match your skills." linkTo="/browse" linkLabel="Browse Projects" />
          ) : (
            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#13151c] overflow-hidden divide-y divide-slate-100 dark:divide-white/[0.05]">
              {myApps.map((app, i) => {
                const s = STATUS[app.status] ?? { label: app.status, cls: 'bg-slate-100 text-slate-500' };
                return (
                  <div key={app.id}
                    className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Index number */}
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-400 dark:text-slate-500 text-[11px] font-semibold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[14px] font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {app.project.title}
                        </p>
                        <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-0.5">
                          by {app.project.owner?.name}
                        </p>
                      </div>
                    </div>
                    <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold ${s.cls}`}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default Dashboard;
