
// src/components/dashboard/RecentActivity.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

const RecentActivity = () => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Activity</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-4">
        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          <span>New order received</span>
          <span className="ml-auto text-sm text-gray-500">2m ago</span>
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          <span>Payment processed</span>
          <span className="ml-auto text-sm text-gray-500">1h ago</span>
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
          <span>New user registered</span>
          <span className="ml-auto text-sm text-gray-500">3h ago</span>
        </li>
      </ul>
    </CardContent>
  </Card>
);

export default RecentActivity;
