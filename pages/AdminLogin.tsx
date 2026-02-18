
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Lock, Mail } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would verify credentials with the backend
    if (email === 'admin@lumina.com' && password === 'admin') {
      navigate('/admin/dashboard');
    } else {
      alert('Invalid Credentials. Use admin@lumina.com / admin');
    }
  };

  return (
    <div className="h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-black border border-luxury/20 p-10 md:p-16 relative overflow-hidden">
        {/* Aesthetic decoration */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-luxury/10 blur-[80px]" />
        
        <div className="text-center mb-12">
          <Camera className="w-12 h-12 text-luxury mx-auto mb-6" />
          <h1 className="text-3xl font-serif text-white tracking-tight">Admin Portal</h1>
          <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">Discerning access only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2">
              <Mail className="w-3 h-3" /> Email Address
            </label>
            <input 
              required
              type="email" 
              className="bg-transparent border-b border-white/10 py-3 text-white focus:border-luxury outline-none transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2">
              <Lock className="w-3 h-3" /> Password
            </label>
            <input 
              required
              type="password" 
              className="bg-transparent border-b border-white/10 py-3 text-white focus:border-luxury outline-none transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="w-full bg-luxury text-black py-4 uppercase tracking-[0.4em] text-xs font-bold hover:bg-white transition-all">
            Enter Dashboard
          </button>
        </form>

        <div className="mt-12 text-center">
          <button onClick={() => navigate('/')} className="text-gray-600 hover:text-white text-[10px] uppercase tracking-widest transition-colors">
            Back to Public Site
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
