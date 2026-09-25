import { useState, useEffect } from 'react';
import { getCollection, deleteDocument } from '../../lib/db';
import { Trash2 } from 'lucide-react';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      // Sort by createdAt desc if possible, or just fetch
      const data = await getCollection('contactMessages');
      setMessages(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        await deleteDocument('contactMessages', id);
        fetchMessages();
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) return <div>Loading messages...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {messages.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No messages found.</div>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{msg.subject}</h3>
                    <div className="text-sm text-gray-500 mt-1">
                      From: <span className="font-medium text-gray-900">{msg.name}</span> ({msg.email})
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400">
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                    <button onClick={() => handleDelete(msg.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700 whitespace-pre-wrap">
                  {msg.message}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageMessages;
