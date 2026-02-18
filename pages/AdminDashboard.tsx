
import React, { useState } from 'react';
import { LayoutDashboard, Image as ImageIcon, FileText, MessageSquare, LogOut, Plus, Trash2, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stats' | 'gallery' | 'blogs' | 'inquiries'>('stats');
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const SidebarLink = ({ id, icon: Icon, label }: { id: any, icon: any, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-4 px-6 py-4 transition-all ${activeTab === id ? 'bg-luxury/10 text-luxury border-r-2 border-luxury' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium uppercase tracking-widest">{label}</span>
    </button>
  );

  return (
    <div className="pt-24 min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/5 hidden lg:flex flex-col">
        <div className="p-8 mb-8">
          <h2 className="text-white font-serif text-xl">Lumina Admin</h2>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">Management Portal</p>
        </div>
        
        <div className="flex-grow">
          <SidebarLink id="stats" icon={LayoutDashboard} label="Dashboard" />
          <SidebarLink id="gallery" icon={ImageIcon} label="Portfolio" />
          <SidebarLink id="blogs" icon={FileText} label="Journal" />
          <SidebarLink id="inquiries" icon={MessageSquare} label="Inquiries" />
        </div>

        <button 
          onClick={handleLogout}
          className="p-8 flex items-center gap-4 text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest text-xs font-bold"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h1 className="text-4xl font-serif text-white uppercase tracking-tight">
                {activeTab === 'stats' && 'Performance Overview'}
                {activeTab === 'gallery' && 'Portfolio Management'}
                {activeTab === 'blogs' && 'Journal Management'}
                {activeTab === 'inquiries' && 'Inquiries Received'}
              </h1>
              <p className="text-gray-500 text-xs uppercase tracking-[0.3em] mt-2">Manage your luxury brand presence</p>
            </div>
            {activeTab !== 'stats' && activeTab !== 'inquiries' && (
              <button className="bg-luxury text-black px-6 py-3 uppercase tracking-widest text-[10px] font-bold flex items-center gap-2 hover:bg-white transition-all">
                <Plus className="w-4 h-4" /> Add New
              </button>
            )}
          </div>

          {activeTab === 'stats' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-black/50 border border-white/5 p-8">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2">Total Images</p>
                <h3 className="text-4xl font-serif text-white">1,248</h3>
              </div>
              <div className="bg-black/50 border border-white/5 p-8">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2">Journal Posts</p>
                <h3 className="text-4xl font-serif text-white">42</h3>
              </div>
              <div className="bg-black/50 border border-white/5 p-8">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2">Total Inquiries</p>
                <h3 className="text-4xl font-serif text-white">156</h3>
              </div>
              <div className="bg-black/50 border border-white/5 p-8">
                <p className="text-luxury text-[10px] uppercase tracking-widest mb-2">Conversion Rate</p>
                <h3 className="text-4xl font-serif text-white">12.4%</h3>
              </div>
            </div>
          )}

          {/* Placeholder for Dynamic Lists */}
          <div className="bg-black/50 border border-white/5 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Details</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Category</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Status</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-900 border border-white/5 flex items-center justify-center overflow-hidden">
                          <img src={`https://picsum.photos/100/100?random=${item + 50}`} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium mb-1">Luxury Wedding Showcase {item}</p>
                          <p className="text-gray-500 text-[10px]">Created on: Jan {item}, 2024</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-xs text-gray-400 font-light">Wedding</td>
                    <td className="px-6 py-6">
                      <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-[10px] uppercase font-bold tracking-widest">Active</span>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-white/5 text-gray-400 hover:text-white rounded transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button className="p-2 hover:bg-white/5 text-gray-400 hover:text-red-500 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
