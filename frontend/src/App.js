import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Browse from './pages/Browse';
import PostProject from './pages/PostProject';
import ProjectDetail from './pages/ProjectDetail';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import './index.css';

export const ThemeContext = createContext({ dark: false, toggle: () => {} });
export const useTheme = () => useContext(ThemeContext);

const NO_NAVBAR_PATHS = ['/login', '/signup'];

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = NO_NAVBAR_PATHS.includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className={!hideNavbar ? 'pt-16' : ''}>{children}</main>
    </>
  );
};

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/browse" element={<ProtectedRoute><Browse /></ProtectedRoute>} />
              <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
              <Route path="/post" element={<ProtectedRoute><PostProject /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </ThemeContext.Provider>
  );
}

export default App;
