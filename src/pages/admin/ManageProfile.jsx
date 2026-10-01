import { useState, useEffect } from 'react';
import { getDocument, setDocument } from '../../lib/db';
import { uploadToCloudinary } from '../../lib/cloudinary';

const ManageProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
    resumeUrl: '',
    imageUrl: ''
  });

  const fetchProfile = async () => {
    try {
      const data = await getDocument('profile', 'main');
      if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDocument('profile', 'main', formData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const media = await uploadToCloudinary(file);
      setFormData({ ...formData, [field]: media.url });
    } catch (error) {
      console.error(error);
      alert('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900">Manage Profile</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title / Headline</label>
              <input type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea rows="4" value={formData.bio || ''} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full px-3 py-2 border rounded-lg"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="text" value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input type="text" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
              <input type="url" value={formData.github || ''} onChange={e => setFormData({...formData, github: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
              <input type="url" value={formData.linkedin || ''} onChange={e => setFormData({...formData, linkedin: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
            </div>

            <div className="col-span-2 border-t border-gray-100 pt-6 mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
              <div className="flex items-center gap-6">
                {formData.imageUrl && (
                  <img src={formData.imageUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover border border-gray-200" />
                )}
                <div>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'imageUrl')} className="text-sm" />
                </div>
              </div>
            </div>

            <div className="col-span-2 border-t border-gray-100 pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Resume PDF</label>
              <div className="flex items-center gap-6">
                {formData.resumeUrl && (
                  <a href={formData.resumeUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm font-medium">
                    View Current Resume
                  </a>
                )}
                <div>
                  <input type="file" accept="application/pdf" onChange={(e) => handleImageUpload(e, 'resumeUrl')} className="text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-100">
            <button 
              type="submit" 
              disabled={saving || uploading} 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageProfile;
