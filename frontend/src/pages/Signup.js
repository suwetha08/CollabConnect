import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { authAPI } from '../api';
import { useAuth } from '../context/AuthContext';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id.apps.googleusercontent.com';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', skills: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setError(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError('All fields are required.'); return; }
    setLoading(true); setError('');
    try {
      const data = await authAPI.register(form);
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const data = await authAPI.googleAuth(credentialResponse.credential);
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const fields = [
    { name: 'name',     type: 'text',     label: 'Full Name',      placeholder: 'John Doe' },
    { name: 'email',    type: 'email',    label: 'Email',          placeholder: 'you@example.com' },
    { name: 'password', type: 'password', label: 'Password',       placeholder: 'Create a strong password' },
    { name: 'skills',   type: 'text',     label: 'Skills',         placeholder: 'React, Node.js, Python (optional)', hint: 'Separate with commas' },
  ];

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-slate-950 to-violet-950/30" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 w-full max-w-md animate-fade-up">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                <span className="text-white font-bold text-lg">CC</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Create account</h1>
              <p className="text-slate-400 text-sm mt-1">Join CollabConnect and start collaborating</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map(({ name, type, label, placeholder, hint }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
                  <input name={name} type={type} placeholder={placeholder}
                    value={form[name]} onChange={handleChange}
                    required={name !== 'skills'}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" />
                  {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
                </div>
              ))}

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? (
                  <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Creating account...</>
                ) : 'Create Account'}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700" /></div>
              <div className="relative flex justify-center"><span className="px-4 bg-slate-900 text-slate-500 text-xs font-medium">OR CONTINUE WITH</span></div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError('Google signup failed.')} theme="filled_black" size="large" width="100%" text="signup_with" />
            </div>

            <p className="text-center text-slate-500 text-sm mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;
