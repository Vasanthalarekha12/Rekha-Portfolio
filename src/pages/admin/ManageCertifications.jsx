import { useState, useEffect } from 'react';
import { getCollection, createDocument, updateDocument, deleteDocument } from '../../lib/db';
import { uploadToCloudinary } from '../../lib/cloudinary';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const ManageCertifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    date: '',
    verifyUrl: '',
    pdfUrl: '',
    order: 0
  });

  const fetchCerts = async () => {
    try {
      const data = await getCollection('certifications', 'order');
      setCertifications(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDocument('certifications', editingId, formData);
      } else {
        await createDocument('certifications', formData);
      }
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({ name: '', organization: '', date: '', verifyUrl: '', pdfUrl: '', order: 0 });
      fetchCerts();
    } catch (error) {
      console.error(error);
      alert('Error saving certification');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this certification?')) {
      try {
        await deleteDocument('certifications', id);
        setSelected(selected.filter(itemId => itemId !== id));
        fetchCerts();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selected.length} selected certification(s)?`)) {
      try {
        for (const id of selected) {
          await deleteDocument('certifications', id);
        }
        setSelected([]);
        fetchCerts();
      } catch (error) {
        console.error(error);
        alert('Error deleting certifications');
      }
    }
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(certifications.map(c => c.id));
    } else {
      setSelected([]);
    }
  };

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const media = await uploadToCloudinary(file);
      setFormData({ ...formData, pdfUrl: media.url });
    } catch (error) {
      console.error(error);
      alert('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div>Loading certifications...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Manage Certifications</h1>
        <div className="flex gap-3">
          {selected.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete Selected ({selected.length})
            </button>
          )}
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({ name: '', organization: '', date: '', verifyUrl: '', pdfUrl: '', order: 0 });
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Certification
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 w-12">
                <input 
                  type="checkbox" 
                  checked={certifications.length > 0 && selected.length === certifications.length}
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500">Name</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500">Organization</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {certifications.map(cert => (
              <tr key={cert.id} className={`hover:bg-gray-50 ${selected.includes(cert.id) ? 'bg-blue-50/50' : ''}`}>
                <td className="px-6 py-4">
                  <input 
                    type="checkbox" 
                    checked={selected.includes(cert.id)}
                    onChange={() => toggleSelect(cert.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{cert.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{cert.organization}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => {
                    setEditingId(cert.id);
                    setFormData(cert);
                    setIsModalOpen(true);
                  }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(cert.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
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
              <h2 className="text-xl font-bold">{editingId ? 'Edit Certification' : 'Add Certification'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                  <input type="text" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="text" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Verification URL</label>
                  <input type="url" value={formData.verifyUrl} onChange={e => setFormData({...formData, verifyUrl: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Certificate PDF/Image</label>
                  <div className="flex items-center gap-4">
                    <input type="file" onChange={handleFileUpload} className="text-sm" />
                    {uploading && <span className="text-sm text-blue-600">Uploading...</span>}
                  </div>
                  {formData.pdfUrl && <p className="text-sm text-green-600 mt-2">File uploaded successfully.</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                  <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" disabled={uploading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  Save Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCertifications;
