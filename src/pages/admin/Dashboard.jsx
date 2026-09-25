import { useState, useEffect } from 'react';
import { getCollection } from '../../lib/db';
import { Briefcase, Code2, Award, MessageSquare, Database } from 'lucide-react';
import { seedDatabase } from '../../lib/seed';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    certifications: 0,
    messages: 0
  });
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const fetchStats = async () => {
    try {
      const [projects, skills, certs, messages] = await Promise.all([
        getCollection('projects'),
        getCollection('skills'),
        getCollection('certifications'),
        getCollection('contactMessages')
      ]);
      setStats({
        projects: projects.length,
        skills: skills.length,
        certifications: certs.length,
        messages: messages.length
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSeed = async () => {
    if (window.confirm('Are you sure you want to initialize the database with default data?')) {
      setSeeding(true);
      await seedDatabase();
      await fetchStats();
      setSeeding(false);
      alert('Database initialized successfully!');
    }
  };

  const statCards = [
    { name: 'Total Projects', value: stats.projects, icon: Briefcase, color: 'bg-blue-500' },
    { name: 'Skills', value: stats.skills, icon: Code2, color: 'bg-green-500' },
    { name: 'Certifications', value: stats.certifications, icon: Award, color: 'bg-purple-500' },
    { name: 'Messages', value: stats.messages, icon: MessageSquare, color: 'bg-pink-500' },
  ];

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <button
          onClick={handleSeed}
          disabled={seeding}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          <Database className="w-4 h-4" />
          {seeding ? 'Initializing...' : 'Initialize Data'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.color} bg-opacity-10 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
