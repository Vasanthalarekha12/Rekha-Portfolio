import { useState, useEffect } from 'react';
import { getCollection, createDocument, updateDocument, deleteDocument } from '../../lib/db';
import { uploadToCloudinary } from '../../lib/cloudinary';
import { Plus, Edit2, Trash2, Image as ImageIcon, X } from 'lucide-react';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    imageUrl: '',
    order: 0
  });

  const fetchProjects = async () => {
    try {
      const data = await getCollection('projects', 'order');
      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      technologies: typeof formData.technologies === 'string' 
        ? formData.technologies.split(',').map(t => t.trim()) 
        : formData.technologies
    };

    try {
      if (editingId) {
        await updateDocument('projects', editingId, projectData);
      } else {
        await createDocument('projects', projectData);
      }
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({
        title: '', date: '', description: '', technologies: '', githubUrl: '', liveUrl: '', imageUrl: '', order: 0
      });
      fetchProjects();
    } catch (error) {
      console.error(error);
      alert('Error saving project');
    }
  };

  const handleEdit = (project) => {
    setFormData({
      ...project,
      technologies: project.technologies?.join(', ') || ''
    });
    setEditingId(project.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDocument('projects', id);
        fetchProjects();
      } catch (error) {
        console.error(error);
        alert('Error deleting project');
      }
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const media = await uploadToCloudinary(file);
      setFormData({ ...formData, imageUrl: media.url });
    } catch (error) {
      console.error(error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div>Loading projects...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Manage Projects</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ title: '', date: '', description: '', technologies: '', githubUrl: '', liveUrl: '', imageUrl: '', order: 0 });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-sm font-medium text-gray-500">Project</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500">Date</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map(project => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                      {project.imageUrl ? (
                        <img src={project.imageUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{project.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-1">{project.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{project.date}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => handleEdit(project)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold">{editingId ? 'Edit Project' : 'Add Project'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="text" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                  <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg" />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma separated)</label>
                  <input type="text" value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea rows="4" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border rounded-lg"></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                  <input type="url" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Live URL</label>
                  <input type="url" value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
                  <div className="flex items-center gap-4">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />
                    {uploading && <span className="text-sm text-blue-600">Uploading...</span>}
                  </div>
                  {formData.imageUrl && (
                    <img src={formData.imageUrl} alt="Preview" className="mt-4 h-32 object-cover rounded-lg border border-gray-200" />
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" disabled={uploading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProjects;
