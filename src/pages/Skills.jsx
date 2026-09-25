import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCollection } from '../lib/db';
import { Layers, Database, BarChart, Settings, Code, Zap } from 'lucide-react';

const iconMap = {
  Programming: Code,
  Database: Database,
  Analytics: BarChart,
  Visualization: Layers,
  'Automation / Microsoft Power Platform': Zap,
  Other: Settings
};

const Skills = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getCollection('skills');
        // Group skills by category
        const grouped = data.reduce((acc, curr) => {
          if (!acc[curr.category]) {
            acc[curr.category] = [];
          }
          acc[curr.category].push(curr);
          return acc;
        }, {});
        setSkillsData(Object.entries(grouped).map(([category, skills]) => ({ category, skills })));
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading skills...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Technical Skills</h1>
        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      {skillsData.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          Skills are currently being updated.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((group, index) => {
            const Icon = iconMap[group.category] || Settings;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{group.category}</h2>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill) => (
                    <span 
                      key={skill.id} 
                      className="px-4 py-2 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 border border-gray-100 hover:border-blue-100 rounded-lg text-gray-700 font-medium transition-colors text-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  );
};

export default Skills;
