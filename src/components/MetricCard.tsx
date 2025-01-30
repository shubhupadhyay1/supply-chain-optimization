import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend: number;
  icon: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend, icon }) => {
  const isPositive = trend >= 0;
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500 text-sm font-medium">{title}</span>
        <div className="text-gray-600">{icon}</div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <ArrowUpIcon size={16} /> : <ArrowDownIcon size={16} />}
          <span className="ml-1 text-sm font-medium">{Math.abs(trend)}%</span>
        </div>
      </div>
    </div>
  );
};