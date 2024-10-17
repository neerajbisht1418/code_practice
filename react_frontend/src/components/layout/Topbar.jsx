// src/components/layout/Topbar.jsx
import React from 'react';
import { Bell, User } from 'lucide-react';

const Topbar = () => {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Company Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar