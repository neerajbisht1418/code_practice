// src/components/ui/Card.jsx
import React from 'react';

export const Card = ({ className, children }) => (
  <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ className, children }) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ className, children }) => (
  <h3 className={`text-lg font-semibold text-gray-800 ${className}`}>
    {children}
  </h3>
);

export const CardContent = ({ className, children }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

export default Card;