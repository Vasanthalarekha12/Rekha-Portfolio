import { useState, useEffect } from 'react';
import { getCollection, createDocument, deleteDocument } from '../../lib/db';
import { Plus, Trash2 } from 'lucide-react';

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', category: 'Programming' });

  const categories = [
    'Programming', 'Database', 'Analytics', 'Visualization', 
    'Automation / Microsoft Power Platform', 'Other'
  ];

  const fetchSkills = async () => {
    try {
      const data = await getCollection('skills');
      setSkills(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDocument('skills', formData);
      setFormData({ name: '', category: formData.category });
      fetchSkills();
    } catch (error) {
      console.error(error);
      alert('Error adding skill');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this skill?')) {
      try {
        await deleteDocument('skills', id);
        fetchSkills();
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) return <div>Loading skills...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Manage Skills</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold mb-4">Add New Skill</h2>
        <form onSubmit={handleSubmit} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-sm font-medium text-gray-500">Category</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500">Skill</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {skills.map(skill => (
              <tr key={skill.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{skill.category}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{skill.name}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(skill.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSkills;
