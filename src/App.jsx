import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import RootLayout from './layouts/RootLayout';
import AdminLayout from './layouts/AdminLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import IntroLoader from './components/IntroLoader';
import CustomCursor from './components/CustomCursor';
import { AnimatePresence } from 'framer-motion';

// Public Pages
import Home from './pages/Home';
import MainPortfolio from './pages/MainPortfolio';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageProfile from './pages/admin/ManageProfile';
import ManageProjects from './pages/admin/ManageProjects';
import ManageSkills from './pages/admin/ManageSkills';
import ManageCertifications from './pages/admin/ManageCertifications';
import ManageMessages from './pages/admin/ManageMessages';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        {showIntro && <IntroLoader onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>
      <Router>
        <Routes>
        {/* Public Routes */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<MainPortfolio />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<ManageProfile />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="skills" element={<ManageSkills />} />
            <Route path="certifications" element={<ManageCertifications />} />
            <Route path="messages" element={<ManageMessages />} />
          </Route>
        </Route>
      </Routes>
      </Router>

      <a 
        href="https://wa.me/918247848743" 
        target="_blank" 
        rel="noreferrer" 
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] transition-all duration-300 z-50 group cursor-interactive"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
        <span className="absolute right-full mr-4 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
          Chat with me
        </span>
      </a>
    </>
  );
}

export default App;
