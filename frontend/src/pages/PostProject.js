import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsAPI } from '../api';

const PostProject = () => {
  const [form, setForm] = useState({ title: '', description: '', skillsRequired: '', teamSize: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setError(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, skillsRequired, teamSize } = form;
    if (!title || !description || !teamSize) { setError('Title, description, and team size are required.'); return; }
    if (parseInt(teamSize) < 1) { setError('Team size must be at least 1.'); return; }
    setLoading(true); setError('');
    try {
      const data = await projectsAPI.create({
        title, description,
        skillsRequired: skillsRequired.split(',').map(s => s.trim()).filter(Boolean),
        teamSize: parseInt(teamSize),
      });
      setSuccess('Project posted successfully!');
      setTimeout(() => navigate(`/projects/${data.project.id}`), 1200);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Post a New Project</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Share your idea and find the right collaborators</p>
        </div>

        <div className="card-base p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Project Title <span className="text-red-400">*</span>
              </label>
              <input name="title" type="text" placeholder="e.g. AI-powered Study Planner"
                value={form.title} onChange={handleChange}
                className="input-base" />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea name="description" rows={5}
                placeholder="Describe your project, goals, and what you're building..."
                value={form.description} onChange={handleChange}
                className="input-base resize-none" />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Required Skills
                <span className="text-slate-400 font-normal ml-1">(comma-separated)</span>
              </label>
              <input name="skillsRequired" type="text" placeholder="React, Node.js, PostgreSQL"
                value={form.skillsRequired} onChange={handleChange}
                className="input-base" />
            </div>

            {/* Team Size */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Team Size <span className="text-red-400">*</span>
              </label>
              <input name="teamSize" type="number" min="1" max="20" placeholder="e.g. 4"
                value={form.teamSize} onChange={handleChange}
                className="input-base max-w-[160px]" />
            </div>

            {/* Feedback */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-600 dark:text-emerald-400 text-sm">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {success}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="btn-primary w-full py-3.5 text-base">
              {loading ? (
                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Posting...</>
              ) : 'Post Project'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostProject;
