import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsAPI, applicationsAPI } from '../api';
import { useAuth } from '../context/AuthContext';

const BADGE_COLORS = [
  'badge-blue', 'badge-purple', 'bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 badge',
  'badge-green', 'badge-yellow',
];

const STATUS_STYLES = {
  PENDING:  'badge-yellow',
  ACCEPTED: 'badge-green',
  REJECTED: 'badge-red',
};

const ProjectDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const isOwner = user && project && user.id === project.createdBy;

  useEffect(() => {
    projectsAPI.getById(id)
      .then(data => {
        setProject(data.project);
        if (user) setApplied(data.project.applications?.some(a => a.userId === user.id));
      })
      .catch(() => setError('Failed to load project.'))
      .finally(() => setLoading(false));
  }, [id, user]);

  useEffect(() => {
    if (isOwner) {
      applicationsAPI.getApplicants(id)
        .then(data => setApplicants(data.applications))
        .catch(() => {});
    }
  }, [id, isOwner]);

  const handleApply = async () => {
    setApplying(true); setError('');
    try { await applicationsAPI.apply(id); setApplied(true); }
    catch (err) { setError(err.message); }
    finally { setApplying(false); }
  };

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      await applicationsAPI.updateStatus({ applicationId, status });
      setApplicants(prev => prev.map(a => a.id === applicationId ? { ...a, status } : a));
      setStatusMsg(`Application ${status.toLowerCase()} successfully.`);
      setTimeout(() => setStatusMsg(''), 3000);
    } catch (err) { setError(err.message); }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh] bg-slate-50 dark:bg-slate-950">
      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (error && !project) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
      <span className="text-4xl mb-3">⚠️</span>
      <p className="text-sm">{error}</p>
      <Link to="/browse" className="mt-4 text-indigo-500 hover:underline text-sm">← Back to Browse</Link>
    </div>
  );
  if (!project) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Back */}
        <Link to="/browse" className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Browse
        </Link>

        {/* Main card */}
        <div className="card-base p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 leading-tight">{project.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                  {project.owner?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {project.owner?.name} · {project.owner?.email}
                </span>
              </div>
            </div>
            <span className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Team of {project.teamSize}
            </span>
          </div>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{project.description}</p>

          {/* Skills */}
          {project.skillsRequired?.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">Required Skills</p>
              <div className="flex flex-wrap gap-2">
                {project.skillsRequired.map((s, i) => (
                  <span key={i} className={BADGE_COLORS[i % BADGE_COLORS.length]}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Feedback */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Apply button */}
          {user && !isOwner && (
            <button onClick={handleApply} disabled={applying || applied}
              className={`px-8 py-3 font-semibold rounded-xl transition-all duration-200 ${
                applied
                  ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 cursor-default'
                  : 'btn-primary'
              }`}>
              {applying ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Sending...
                </span>
              ) : applied ? '✓ Application Sent' : 'Apply to Join'}
            </button>
          )}
        </div>

        {/* Applicants panel — owner only */}
        {isOwner && (
          <div className="card-base p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="section-title">Applicants</h2>
                <p className="section-sub mt-0.5">{applicants.length} application{applicants.length !== 1 ? 's' : ''}</p>
              </div>
              {statusMsg && (
                <span className="badge badge-green">{statusMsg}</span>
              )}
            </div>

            {applicants.length === 0 ? (
              <div className="flex flex-col items-center py-12 text-slate-400">
                <span className="text-4xl mb-3">📭</span>
                <p className="text-sm">No applications yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {applicants.map(app => (
                  <div key={app.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                          {app.user.name?.charAt(0).toUpperCase()}
                        </div>
                        <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">{app.user.name}</p>
                        <span className={`badge ${STATUS_STYLES[app.status] || 'bg-slate-100 text-slate-600'}`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 ml-9">{app.user.email}</p>
                      {app.user.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2 ml-9">
                          {app.user.skills.map((s, i) => (
                            <span key={i} className="badge badge-blue">{s}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    {app.status === 'PENDING' && (
                      <div className="flex gap-2 sm:flex-shrink-0">
                        <button onClick={() => handleStatusUpdate(app.id, 'ACCEPTED')}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors">
                          Accept
                        </button>
                        <button onClick={() => handleStatusUpdate(app.id, 'REJECTED')}
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-xl transition-colors">
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default ProjectDetail;
