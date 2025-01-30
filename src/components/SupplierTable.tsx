import React from 'react';
import { Supplier } from '../types';

interface SupplierTableProps {
  suppliers: Supplier[];
}

export const SupplierTable: React.FC<SupplierTableProps> = ({ suppliers }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Supplier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reliability
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lead Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost/Unit
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {supplier.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {supplier.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {(supplier.reliability * 100).toFixed(1)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {supplier.leadTime} days
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${supplier.costPerUnit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};