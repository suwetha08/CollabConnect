import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '', skills: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let data;
      if (isLogin) {
        data = await authAPI.login({ email: form.email, password: form.password });
      } else {
        if (!form.name || !form.email || !form.password) {
          setError('All fields are required.');
          setLoading(false);
          return;
        }
        data = await authAPI.register(form);
      }
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggle = () => {
    setIsLogin(!isLogin);
    setError('');
    setForm({ name: '', email: '', password: '', skills: '' });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-toggle">
          <button className={isLogin ? 'active' : ''} onClick={() => toggle()}>Login</button>
          <button className={!isLogin ? 'active' : ''} onClick={() => toggle()}>Register</button>
        </div>

        <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input name="name" type="text" placeholder="John Doe" value={form.name} onChange={handleChange} required />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label>Skills <span className="hint">(comma-separated)</span></label>
              <input name="skills" type="text" placeholder="React, Node.js, Python" value={form.skills} onChange={handleChange} />
            </div>
          )}

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? <span className="spinner-sm" /> : isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button onClick={toggle}>{isLogin ? ' Register' : ' Login'}</button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
