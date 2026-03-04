import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Image as ImageIcon, FileText, MessageSquare, LogOut, Plus, Trash2, Edit2, X, Save, Video, Image as BannerIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { galleryAPI, blogAPI, inquiryAPI, bannerAPI, videoAPI } from '../utils/api';
import { GalleryItem, BlogPost, Inquiry } from '../types';

type TabType = 'stats' | 'gallery' | 'banners' | 'videos' | 'blogs' | 'inquiries';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('stats');
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [modalType, setModalType] = useState<'gallery' | 'blog' | 'banner' | 'video' | null>(null);
  const [stats, setStats] = useState({ images: 0, blogs: 0, inquiries: 0, videos: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'gallery') {
        const data = await galleryAPI.getAll();
        setGalleryItems(data);
        setStats(prev => ({ ...prev, images: data.length }));
      } else if (activeTab === 'blogs') {
        const data = await blogAPI.getAllAdmin();
        setBlogs(data);
        setStats(prev => ({ ...prev, blogs: data.length }));
      } else if (activeTab === 'inquiries') {
        const data = await inquiryAPI.getAll();
        setInquiries(data);
        setStats(prev => ({ ...prev, inquiries: data.length }));
      } else if (activeTab === 'banners') {
        const data = await bannerAPI.getAllAdmin();
        setBanners(data);
      } else if (activeTab === 'videos') {
        const data = await videoAPI.getAllAdmin();
        setVideos(data);
        setStats(prev => ({ ...prev, videos: data.length }));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Error loading data. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, type: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      if (type === 'gallery') {
        await galleryAPI.delete(id);
        setGalleryItems(galleryItems.filter(item => item.id !== id));
      } else if (type === 'blog') {
        await blogAPI.delete(id);
        setBlogs(blogs.filter(blog => blog.id !== id));
      } else if (type === 'banner') {
        await bannerAPI.delete(id);
        setBanners(banners.filter(b => b._id !== id));
      } else if (type === 'video') {
        await videoAPI.delete(id);
        setVideos(videos.filter(v => v._id !== id));
      } else if (type === 'inquiry') {
        await inquiryAPI.delete(id);
        setInquiries(inquiries.filter(i => i.id !== id));
      }
      alert('Deleted successfully');
    } catch (error) {
      alert('Error deleting item');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const openModal = (type: 'gallery' | 'blog' | 'banner' | 'video', item?: any) => {
    setModalType(type);
    setEditingItem(item || null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setModalType(null);
  };

  const SidebarLink = ({ id, icon: Icon, label }: { id: TabType, icon: any, label: string }) => (
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
          <h2 className="text-white font-serif text-xl">shivaay Admin</h2>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">Management Portal</p>
        </div>
        
        <div className="flex-grow">
          <SidebarLink id="stats" icon={LayoutDashboard} label="Dashboard" />
          <SidebarLink id="gallery" icon={ImageIcon} label="Portfolio" />
          <SidebarLink id="banners" icon={BannerIcon} label="Banners" />
          <SidebarLink id="videos" icon={Video} label="Videos" />
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
                {activeTab === 'banners' && 'Banner Management'}
                {activeTab === 'videos' && 'Video Management'}
                {activeTab === 'blogs' && 'Journal Management'}
                {activeTab === 'inquiries' && 'Inquiries Received'}
              </h1>
              <p className="text-gray-500 text-xs uppercase tracking-[0.3em] mt-2">Manage your luxury brand presence</p>
            </div>
            {activeTab !== 'stats' && activeTab !== 'inquiries' && (
              <button 
                onClick={() => openModal(activeTab as any)}
                className="bg-luxury text-black px-6 py-3 uppercase tracking-widest text-[10px] font-bold flex items-center gap-2 hover:bg-white transition-all"
              >
                <Plus className="w-4 h-4" /> Add New
              </button>
            )}
          </div>

          {activeTab === 'stats' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-black/50 border border-white/5 p-8">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2">Total Images</p>
                <h3 className="text-4xl font-serif text-white">{stats.images}</h3>
              </div>
              <div className="bg-black/50 border border-white/5 p-8">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2">Journal Posts</p>
                <h3 className="text-4xl font-serif text-white">{stats.blogs}</h3>
              </div>
              <div className="bg-black/50 border border-white/5 p-8">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2">Total Inquiries</p>
                <h3 className="text-4xl font-serif text-white">{stats.inquiries}</h3>
              </div>
              <div className="bg-black/50 border border-white/5 p-8">
                <p className="text-luxury text-[10px] uppercase tracking-widest mb-2">Total Videos</p>
                <h3 className="text-4xl font-serif text-white">{stats.videos}</h3>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-20 text-gray-500">Loading...</div>
          ) : (
            <>
              {/* Gallery Table */}
              {activeTab === 'gallery' && (
                <div className="bg-black/50 border border-white/5 overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5">
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Image</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Title</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Category</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Featured</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {galleryItems.map((item) => (
                        <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-6">
                            <div className="w-16 h-16 bg-gray-900 border border-white/5 overflow-hidden rounded">
                              <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.title} />
                            </div>
                          </td>
                          <td className="px-6 py-6">
                            <p className="text-white text-sm font-medium">{item.title}</p>
                          </td>
                          <td className="px-6 py-6 text-xs text-gray-400 font-light">{item.category}</td>
                          <td className="px-6 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${item.featured ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'}`}>
                              {item.featured ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="px-6 py-6 text-right">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => openModal('gallery', item)} className="p-2 hover:bg-white/5 text-gray-400 hover:text-white rounded transition-colors"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => handleDelete(item.id, 'gallery')} className="p-2 hover:bg-white/5 text-gray-400 hover:text-red-500 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Banners Table */}
              {activeTab === 'banners' && (
                <div className="bg-black/50 border border-white/5 overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5">
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Image</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Title</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Status</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {banners.map((banner) => (
                        <tr key={banner._id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-6">
                            <div className="w-16 h-16 bg-gray-900 border border-white/5 overflow-hidden rounded">
                              {banner.imageUrl && <img src={`https://shivaay-backend.onrender.com${banner.imageUrl}`} className="w-full h-full object-cover" alt={banner.title} />}
                            </div>
                          </td>
                          <td className="px-6 py-6">
                            <p className="text-white text-sm font-medium">{banner.title}</p>
                            {banner.subtitle && <p className="text-gray-500 text-xs">{banner.subtitle}</p>}
                          </td>
                          <td className="px-6 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${banner.isActive ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'}`}>
                              {banner.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-6 text-right">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => openModal('banner', banner)} className="p-2 hover:bg-white/5 text-gray-400 hover:text-white rounded transition-colors"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => handleDelete(banner._id, 'banner')} className="p-2 hover:bg-white/5 text-gray-400 hover:text-red-500 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Videos Table */}
              {activeTab === 'videos' && (
                <div className="bg-black/50 border border-white/5 overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5">
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Thumbnail</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Title</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Category</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Status</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {videos.map((video) => (
                        <tr key={video._id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-6">
                            <div className="w-16 h-16 bg-gray-900 border border-white/5 overflow-hidden rounded">
                              {video.thumbnailUrl && (() => {
                                const thumbnailUrl = video.thumbnailUrl.startsWith('http') 
                                  ? video.thumbnailUrl 
                                  : video.thumbnailUrl.startsWith('/')
                                    ? `https://shivaay-backend.onrender.com${video.thumbnailUrl}`
                                    : `https://shivaay-backend.onrender.com/${video.thumbnailUrl}`;
                                return <img src={thumbnailUrl} className="w-full h-full object-cover" alt={video.title} />;
                              })()}
                            </div>
                          </td>
                          <td className="px-6 py-6">
                            <p className="text-white text-sm font-medium">{video.title}</p>
                            {video.location && <p className="text-gray-500 text-xs">{video.location}</p>}
                          </td>
                          <td className="px-6 py-6 text-xs text-gray-400 font-light">{video.category}</td>
                          <td className="px-6 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${video.isActive ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'}`}>
                              {video.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-6 text-right">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => openModal('video', video)} className="p-2 hover:bg-white/5 text-gray-400 hover:text-white rounded transition-colors"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => handleDelete(video._id, 'video')} className="p-2 hover:bg-white/5 text-gray-400 hover:text-red-500 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Blogs Table */}
              {activeTab === 'blogs' && (
                <div className="bg-black/50 border border-white/5 overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5">
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Image</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Title</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Category</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Status</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {blogs.map((blog) => (
                        <tr key={blog.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-6">
                            <div className="w-16 h-16 bg-gray-900 border border-white/5 overflow-hidden rounded">
                              <img src={blog.featuredImage} className="w-full h-full object-cover" alt={blog.title} />
                            </div>
                          </td>
                          <td className="px-6 py-6">
                            <p className="text-white text-sm font-medium">{blog.title}</p>
                            <p className="text-gray-500 text-xs">{new Date(blog.date).toLocaleDateString()}</p>
                          </td>
                          <td className="px-6 py-6 text-xs text-gray-400 font-light">{blog.category}</td>
                          <td className="px-6 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${blog.isPublished ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'}`}>
                              {blog.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td className="px-6 py-6 text-right">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => openModal('blog', blog)} className="p-2 hover:bg-white/5 text-gray-400 hover:text-white rounded transition-colors"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => handleDelete(blog.id, 'blog')} className="p-2 hover:bg-white/5 text-gray-400 hover:text-red-500 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Inquiries Table */}
              {activeTab === 'inquiries' && (
                <div className="bg-black/50 border border-white/5 overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5">
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Name</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Contact</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Event Date</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Status</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {inquiries.map((inquiry) => (
                        <tr key={inquiry.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-6">
                            <p className="text-white text-sm font-medium">{inquiry.name}</p>
                          </td>
                          <td className="px-6 py-6">
                            <p className="text-white text-xs">{inquiry.email}</p>
                            <p className="text-gray-500 text-xs">{inquiry.phone}</p>
                          </td>
                          <td className="px-6 py-6 text-xs text-gray-400 font-light">
                            {inquiry.eventDate ? new Date(inquiry.eventDate).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-6 py-6">
                            <select 
                              value={inquiry.status || 'new'}
                              onChange={async (e) => {
                                try {
                                  await inquiryAPI.update(inquiry.id, e.target.value);
                                  loadData();
                                } catch (error) {
                                  alert('Error updating status');
                                }
                              }}
                              className="bg-black/50 border border-white/10 text-white text-xs px-3 py-1 rounded"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="quoted">Quoted</option>
                              <option value="booked">Booked</option>
                              <option value="completed">Completed</option>
                            </select>
                          </td>
                          <td className="px-6 py-6 text-right">
                            <button onClick={() => handleDelete(inquiry.id, 'inquiry')} className="p-2 hover:bg-white/5 text-gray-400 hover:text-red-500 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {showModal && modalType && (
        <ModalForm 
          type={modalType} 
          item={editingItem} 
          onClose={closeModal} 
          onSave={async () => {
            await loadData();
            closeModal();
          }} 
        />
      )}
    </div>
  );
};

// Modal Form Component
const ModalForm: React.FC<{ type: 'gallery' | 'blog' | 'banner' | 'video', item?: any, onClose: () => void, onSave: () => void }> = ({ type, item, onClose, onSave }) => {
  const [formData, setFormData] = useState<any>(item || {});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formDataToSend = new FormData();
      
      if (type === 'gallery') {
        Object.keys(formData).forEach(key => {
          if (key !== 'imageUrl' && key !== 'id' && key !== '_id') {
            formDataToSend.append(key, formData[key]);
          }
        });
        if (imageFile) formDataToSend.append('image', imageFile);
        else if (formData.imageUrl) formDataToSend.append('imageUrl', formData.imageUrl);

        if (item?._id || item?.id) {
          await galleryAPI.update(item._id || item.id, formDataToSend);
        } else {
          await galleryAPI.create(formDataToSend);
        }
      } else if (type === 'blog') {
        Object.keys(formData).forEach(key => {
          if (key !== 'featuredImage' && key !== 'id' && key !== '_id') {
            formDataToSend.append(key, formData[key]);
          }
        });
        if (imageFile) formDataToSend.append('featuredImage', imageFile);
        else if (formData.featuredImage) formDataToSend.append('featuredImage', formData.featuredImage);

        if (item?._id || item?.id) {
          await blogAPI.update(item._id || item.id, formDataToSend);
        } else {
          await blogAPI.create(formDataToSend);
        }
      } else if (type === 'banner') {
        Object.keys(formData).forEach(key => {
          if (key !== 'imageUrl' && key !== 'id' && key !== '_id') {
            formDataToSend.append(key, formData[key]);
          }
        });
        if (imageFile) formDataToSend.append('image', imageFile);
        else if (formData.imageUrl) formDataToSend.append('imageUrl', formData.imageUrl);

        if (item?._id) {
          await bannerAPI.update(item._id, formDataToSend);
        } else {
          await bannerAPI.create(formDataToSend);
        }
      } else if (type === 'video') {
        Object.keys(formData).forEach(key => {
          if (key !== 'videoUrl' && key !== 'thumbnailUrl' && key !== 'id' && key !== '_id') {
            formDataToSend.append(key, formData[key]);
          }
        });
        if (videoFile) formDataToSend.append('video', videoFile);
        else if (formData.videoUrl) formDataToSend.append('videoUrl', formData.videoUrl);
        if (thumbnailFile) formDataToSend.append('thumbnail', thumbnailFile);
        else if (formData.thumbnailUrl) formDataToSend.append('thumbnailUrl', formData.thumbnailUrl);

        if (item?._id) {
          await videoAPI.update(item._id, formDataToSend);
        } else {
          await videoAPI.create(formDataToSend);
        }
      }

      alert('Saved successfully!');
      onSave();
    } catch (error: any) {
      alert('Error saving: ' + (error.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-[2000] flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-white text-xl font-serif">
            {item ? 'Edit' : 'Add New'} {type === 'gallery' ? 'Gallery Item' : type === 'blog' ? 'Blog Post' : type === 'banner' ? 'Banner' : 'Video'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {type === 'gallery' && (
            <>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Category</label>
                <select 
                  value={formData.category || 'Wedding'}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded"
                >
                  <option>Wedding</option>
                  <option>Pre-Wedding</option>
                  <option>Events</option>
                  <option>Commercial</option>
                  <option>Portrait</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded"
                />
                {!imageFile && formData.imageUrl && (
                  <input 
                    type="text" 
                    placeholder="Or enter image URL"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded mt-2"
                  />
                )}
              </div>
              <div className="flex items-center gap-4">
                <label className="text-gray-400 text-xs uppercase tracking-widest">Featured</label>
                <input 
                  type="checkbox" 
                  checked={formData.featured || false}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="w-4 h-4"
                />
              </div>
            </>
          )}

          {type === 'blog' && (
            <>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Slug</label>
                <input 
                  type="text" 
                  required
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Excerpt</label>
                <textarea 
                  required
                  value={formData.excerpt || ''}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Content</label>
                <textarea 
                  required
                  value={formData.content || ''}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded"
                  rows={6}
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Category</label>
                <input 
                  type="text" 
                  required
                  value={formData.category || ''}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Featured Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded"
                />
                {!imageFile && formData.featuredImage && (
                  <input 
                    type="text" 
                    placeholder="Or enter image URL"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData({...formData, featuredImage: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded mt-2"
                  />
                )}
              </div>
              <div className="flex items-center gap-4">
                <label className="text-gray-400 text-xs uppercase tracking-widest">Published</label>
                <input 
                  type="checkbox" 
                  checked={formData.isPublished || false}
                  onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                  className="w-4 h-4"
                />
              </div>
            </>
          )}

          {type === 'banner' && (
            <>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Subtitle</label>
                <input 
                  type="text" 
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded"
                />
                {!imageFile && formData.imageUrl && (
                  <input 
                    type="text" 
                    placeholder="Or enter image URL"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded mt-2"
                  />
                )}
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Video URL (Optional)</label>
                <input 
                  type="text" 
                  value={formData.videoUrl || ''}
                  onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-gray-400 text-xs uppercase tracking-widest">Active</label>
                <input 
                  type="checkbox" 
                  checked={formData.isActive !== false}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="w-4 h-4"
                />
              </div>
            </>
          )}

          {type === 'video' && (
            <>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Category</label>
                <select 
                  value={formData.category || 'Wedding'}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded"
                >
                  <option>Wedding</option>
                  <option>Pre-Wedding</option>
                  <option>Events</option>
                  <option>Commercial</option>
                  <option>Portrait</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Location</label>
                <input 
                  type="text" 
                  value={formData.location || ''}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Video</label>
                <input 
                  type="file" 
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded"
                />
                {!videoFile && formData.videoUrl && (
                  <input 
                    type="text" 
                    placeholder="Or enter video URL"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded mt-2"
                  />
                )}
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Thumbnail</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded"
                />
                {!thumbnailFile && formData.thumbnailUrl && (
                  <input 
                    type="text" 
                    placeholder="Or enter thumbnail URL"
                    value={formData.thumbnailUrl}
                    onChange={(e) => setFormData({...formData, thumbnailUrl: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded mt-2"
                  />
                )}
              </div>
              <div className="flex items-center gap-4">
                <label className="text-gray-400 text-xs uppercase tracking-widest">Active</label>
                <input 
                  type="checkbox" 
                  checked={formData.isActive !== false}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="w-4 h-4"
                />
              </div>
            </>
          )}

          <div className="flex gap-4 justify-end pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="px-6 py-2 border border-white/10 text-white hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="px-6 py-2 bg-luxury text-black hover:bg-white transition-colors flex items-center gap-2 disabled:opacity-50">
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
