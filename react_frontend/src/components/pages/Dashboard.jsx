// src/pages/Dashboard.jsx
import React from 'react';
import { Activity, DollarSign, Users, ShoppingCart } from 'lucide-react';
import Layout from '../layout/Layout';
import StatCard from '../dashboard/StatCard';
import SalesChart from '../dashboard/SalesChart';
import RecentActivity from '../dashboard/RecentActivity';
import TopProducts from '../dashboard/TopProducts';

const Dashboard = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Revenue" value="$45,231.89" icon={DollarSign} />
        <StatCard title="New Customers" value="+2350" icon={Users} />
        <StatCard title="Sales" value="+12,234" icon={ShoppingCart} />
        <StatCard title="Active Users" value="573" icon={Activity} />
      </div>
      
      <div className="mb-8">
        <SalesChart />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RecentActivity />
        <TopProducts />
      </div>
    </Layout>
  );
};

export default Dashboard;