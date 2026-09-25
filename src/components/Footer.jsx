import { Code2, Globe, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-bold text-xl text-gray-900">Vasanthala Rekha Rani</span>
            <p className="text-gray-500 mt-2">AI & ML Engineering Student</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="https://github.com/VasanthalaRekhaRani" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
              <span className="sr-only">GitHub</span>
              <Code2 className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com/in/rekha-vasanthala" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <Globe className="h-6 w-6" />
            </a>
            <a href="mailto:vasanthalarekha12@gmail.com" className="text-gray-400 hover:text-blue-600 transition-colors">
              <span className="sr-only">Email</span>
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-100 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Vasanthala Rekha Rani. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
