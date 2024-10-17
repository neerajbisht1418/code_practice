import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, BarChart2, Settings, Menu, X } from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, children, onClick }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-blue-500 text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`
    }
    onClick={onClick}
  >
    <Icon size={20} />
    <span>{children}</span>
  </NavLink>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && window.innerWidth <= 768) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-200 text-gray-800"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <aside
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 z-10 h-full w-64 bg-white text-gray-800 p-4 border-r border-gray-200
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <div className="text-2xl font-bold mb-8">Your Logo</div>
        <nav className="space-y-2">
          <SidebarLink to="/dashboard" icon={Home} onClick={() => handleNavigation('/dashboard')}>
            Dashboard
          </SidebarLink>
          <SidebarLink to="/analytics" icon={BarChart2} onClick={() => handleNavigation('/analytics')}>
            Analytics
          </SidebarLink>
          <SidebarLink to="/settings" icon={Settings} onClick={() => handleNavigation('/settings')}>
            Settings
          </SidebarLink>
        </nav>
      </aside>
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;