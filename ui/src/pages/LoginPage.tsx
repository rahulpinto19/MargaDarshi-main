import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, LogIn, User, Lock, ArrowLeft } from 'lucide-react';
import FloatingIcons from '../components/FloatingIcons';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (!email || !password) {
        setError('Please enter both email and password');
        setLoading(false);
        return;
      }
      const usersRaw = localStorage.getItem('md_users');
      const users: Record<string, { name: string; email: string; password: string }>= usersRaw ? JSON.parse(usersRaw) : {};
      const existing = users[email.toLowerCase()];
      if (existing) {
        if (existing.password === password) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', email.toLowerCase());
          localStorage.setItem('userName', existing.name);
          navigate('/upload');
        } else {
          setError('Incorrect password');
        }
      } else {
        // fallback legacy: allow login without pre-signup
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email.toLowerCase());
        navigate('/upload');
      }
      setLoading(false);
    }, 700);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (!name.trim()) {
        setError('Please enter your name');
        setLoading(false);
        return;
      }
      if (!email || !password) {
        setError('Please enter email and password');
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      const usersRaw = localStorage.getItem('md_users');
      const users: Record<string, { name: string; email: string; password: string }>= usersRaw ? JSON.parse(usersRaw) : {};
      const key = email.toLowerCase();
      if (users[key]) {
        setError('An account with this email already exists');
        setLoading(false);
        return;
      }
      users[key] = { name: name.trim(), email: key, password };
      localStorage.setItem('md_users', JSON.stringify(users));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', key);
      localStorage.setItem('userName', name.trim());
      navigate('/upload');
      setLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      <FloatingIcons />
      
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 flex items-center px-4 py-2 text-sm font-medium bg-white/70 backdrop-blur-md text-gray-700 hover:text-purple-600 border border-white/50 rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </button>
      {/* Decorative Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 text-white/10 animate-float">
          <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
          </svg>
        </div>
        <div className="absolute top-40 right-20 text-white/10 animate-float" style={{animationDelay: '2s'}}>
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
          </svg>
        </div>
        <div className="absolute bottom-20 left-1/4 text-white/10 animate-float" style={{animationDelay: '4s'}}>
          <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
        </div>
      </div>
      
      <div className="max-w-md w-full relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-4">
          <div className="inline-block p-2.5 bg-blue-600 rounded-2xl mb-2 shadow-xl relative">
            <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
            <FileText className="h-10 w-10 text-white relative z-10" />
          </div>
          <h1 className="text-3xl font-bold text-blue-700 mb-1 drop-shadow-lg tracking-tight leading-tight">
            MargaDarshi
          </h1>
          <p className="font-medium text-sm drop-shadow text-blue-700">AI-Powered Evaluation Platform</p>
        </div>

        {/* Auth Card */}
        <div className="glass-effect rounded-2xl p-6 animate-glow">
          {/* Tabs */}
          <div className="flex items-center justify-center mb-4">
            <button
              className={`px-4 py-2 rounded-l-xl border border-blue-300 font-semibold ${mode==='login' ? 'bg-blue-600 text-white' : 'bg-white/70 text-blue-700 hover:bg-white'}`}
              onClick={() => { setMode('login'); setError(''); }}
              type="button"
            >
              Login
            </button>
            <button
              className={`px-4 py-2 rounded-r-xl border-t border-b border-r border-blue-300 font-semibold ${mode==='signup' ? 'bg-blue-600 text-white' : 'bg-white/70 text-blue-700 hover:bg-white'}`}
              onClick={() => { setMode('signup'); setError(''); }}
              type="button"
            >
              Signup
            </button>
          </div>

          {/* Heading */}
          <div className="text-center mb-4">
            {mode === 'login' ? (
              <>
                <h2 className="text-xl font-bold text-blue-700 mb-1">Welcome Back</h2>
                <p className="text-gray-600 text-xs">Sign in to continue</p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-blue-700 mb-1">Create your account</h2>
                <p className="text-gray-600 text-xs">It takes less than a minute</p>
              </>
            )}
          </div>
          
          <form onSubmit={mode==='login' ? handleLogin : handleSignup} className="space-y-3">
            {mode === 'signup' && (
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm hover:bg-white/80 text-gray-900 font-medium"
                  placeholder="Jane Doe"
                  required
                />
              </div>
            )}
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-2.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white/50 backdrop-blur-sm hover:bg-white/80 text-gray-900 font-medium"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-2.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white/50 backdrop-blur-sm hover:bg-white/80 text-gray-900 font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm hover:bg-white/80 text-gray-900 font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-3 text-red-700 text-sm font-medium flex items-center">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group mt-4 hover:bg-blue-700"
            >
              <div className="absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 flex items-center">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    {mode==='login' ? 'Logging in...' : 'Creating account...'}
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    {mode==='login' ? 'Login' : 'Create account'}
                  </>
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-3 drop-shadow font-semibold text-blue-700">
          Powered by Gemini AI • Tesseract OCR
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

