import React, { useState, useEffect } from 'react';
import { userAPI } from '../api';
import { useAuth } from '../context/AuthContext';

const STATUS_STYLES = {
  PENDING:  'badge-yellow',
  ACCEPTED: 'badge-green',
  REJECTED: 'badge-red',
};

const Profile = () => {
  const { updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', skills: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    userAPI.getProfile()
      .then(data => {
        setProfile(data.user);
        setForm({ name: data.user.name, skills: data.user.skills.join(', ') });
      })
      .catch(() => setError('Failed to load profile.'))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true); setError('');
    try {
      const data = await userAPI.updateProfile({
        name: form.name,
        skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
      });
      setProfile(prev => ({ ...prev, ...data.user }));
      updateUser(data.user);
      setSuccess('Profile updated!');
      setEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (!profile) return <p className="text-center text-red-500 py-20">{error}</p>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Profile Card */}
        <div className="card-base p-8">
          <div className="flex flex-col items-center text-center mb-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-3xl font-extrabold mb-4 shadow-glow">
              {profile.name.charAt(0).toUpperCase()}
            </div>

            {editing ? (
              <form onSubmit={handleSave} className="w-full space-y-4 text-left">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="input-base" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Skills <span className="text-slate-400 font-normal">(comma-separated)</span>
                  </label>
                  <input value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })}
                    placeholder="React, Python, Design" className="input-base" />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <div className="flex gap-3">
                  <button type="submit" disabled={saving} className="btn-primary flex-1 py-3">
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button type="button" onClick={() => setEditing(false)}
                    className="flex-1 py-3 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{profile.name}</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{profile.email}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 justify-center mt-4 mb-5">
                  {profile.skills.length > 0
                    ? profile.skills.map((s, i) => (
                        <span key={i} className={`badge ${i % 2 === 0 ? 'badge-blue' : 'badge-purple'}`}>{s}</span>
                      ))
                    : <span className="text-slate-400 text-sm">No skills added yet</span>
                  }
                </div>

                {success && (
                  <p className="text-emerald-600 dark:text-emerald-400 text-sm mb-3 font-medium">{success}</p>
                )}

                <button onClick={() => setEditing(true)}
                  className="btn-secondary text-sm px-5 py-2.5">
                  ✏️ Edit Profile
                </button>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-700 pt-6">
            <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <span className="text-2xl font-extrabold gradient-text">{profile.projects?.length || 0}</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Projects Posted</p>
            </div>
            <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <span className="text-2xl font-extrabold gradient-text">{profile.applications?.length || 0}</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Projects Applied</p>
            </div>
          </div>
        </div>

        {/* My Projects */}
        {profile.projects?.length > 0 && (
          <div className="card-base p-6">
            <h3 className="section-title mb-4">My Projects</h3>
            <div className="space-y-3">
              {profile.projects.map(p => (
                <div key={p.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">{p.title}</p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {p.skillsRequired?.map((s, i) => (
                      <span key={i} className="badge badge-purple text-xs">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Applications */}
        {profile.applications?.length > 0 && (
          <div className="card-base p-6">
            <h3 className="section-title mb-4">My Applications</h3>
            <div className="space-y-2">
              {profile.applications.map(a => (
                <div key={a.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">{a.project.title}</p>
                  <span className={`badge ${STATUS_STYLES[a.status] || 'bg-slate-100 text-slate-600'}`}>{a.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;
