
// src/components/dashboard/TopProducts.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

const TopProducts = () => (
  <Card>
    <CardHeader>
      <CardTitle>Top Products</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-4">
        <li className="flex items-center">
          <span className="font-medium">1.</span>
          <span className="ml-2">Product A</span>
          <span className="ml-auto">$1,234</span>
        </li>
        <li className="flex items-center">
          <span className="font-medium">2.</span>
          <span className="ml-2">Product B</span>
          <span className="ml-auto">$987</span>
        </li>
        <li className="flex items-center">
          <span className="font-medium">3.</span>
          <span className="ml-2">Product C</span>
          <span className="ml-auto">$654</span>
        </li>
      </ul>
    </CardContent>
  </Card>
);

export default TopProducts;