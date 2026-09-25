import { motion } from 'framer-motion';
import { ArrowRight, Download, BrainCircuit, Database, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm md:text-base">
                Artificial Intelligence & Machine Learning Student
              </h2>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Rekha</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Transforming raw data into meaningful insights. Passionate about Data Analytics, Machine Learning, and building data-driven solutions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/projects"
                className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gray-900 hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a 
                href="/resume.pdf"
                target="_blank"
                className="inline-flex justify-center items-center px-8 py-4 border-2 border-gray-200 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                Download Resume
                <Download className="ml-2 h-5 w-5" />
              </a>
            </div>

            <div className="pt-8 border-t border-gray-100 flex gap-8">
              <div className="flex items-center gap-3 text-gray-600">
                <Database className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Data Analytics</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <BrainCircuit className="h-5 w-5 text-purple-500" />
                <span className="font-medium">Machine Learning</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <LineChart className="h-5 w-5 text-pink-500" />
                <span className="font-medium">BI & Automation</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-[2rem] transform rotate-6 scale-105 opacity-50"></div>
              <div className="absolute inset-0 bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-white/50 backdrop-blur-sm">
                <img 
                  src="/profile.jpg" 
                  alt="Vasanthala Rekha Rani"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = 'https://ui-avatars.com/api/?name=Rekha+Rani&size=512&background=random';
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
