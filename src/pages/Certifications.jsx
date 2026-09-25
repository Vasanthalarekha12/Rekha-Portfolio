import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, FileText } from 'lucide-react';
import { getCollection } from '../lib/db';

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const data = await getCollection('certifications', 'order');
        setCertifications(data);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading certifications...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Certifications</h1>
        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          Certifications are currently being updated.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 leading-tight">{cert.name}</h3>
                  {cert.organization && (
                    <p className="text-gray-500 text-sm mt-1">{cert.organization}</p>
                  )}
                  {cert.date && (
                    <p className="text-gray-400 text-xs mt-1">{cert.date}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-auto pt-4 flex gap-3">
                {cert.verifyUrl && (
                  <a 
                    href={cert.verifyUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Verify
                  </a>
                )}
                {cert.pdfUrl && (
                  <a 
                    href={cert.pdfUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    <FileText className="w-4 h-4" />
                    Certificate
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Certifications;
