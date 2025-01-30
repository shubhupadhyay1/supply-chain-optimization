import React from 'react';
import { ShipmentStatus } from '../types';
import { Truck, CheckCircle, AlertCircle } from 'lucide-react';

interface ShipmentTrackerProps {
  shipments: ShipmentStatus[];
}

export const ShipmentTracker: React.FC<ShipmentTrackerProps> = ({ shipments }) => {
  const getStatusIcon = (status: ShipmentStatus['status']) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="text-green-500" />;
      case 'delayed':
        return <AlertCircle className="text-red-500" />;
      default:
        return <Truck className="text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Active Shipments</h3>
      <div className="space-y-4">
        {shipments.map((shipment) => (
          <div key={shipment.id} className="flex items-center p-4 border rounded-lg">
            <div className="mr-4">
              {getStatusIcon(shipment.status)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">
                    {shipment.origin} → {shipment.destination}
                  </p>
                  <p className="text-sm text-gray-500">
                    ETA: {shipment.estimatedArrival}
                  </p>
                </div>
                <div className={`text-sm font-medium ${
                  shipment.status === 'delayed' ? 'text-red-500' : 
                  shipment.status === 'delivered' ? 'text-green-500' : 'text-blue-500'
                }`}>
                  {shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)}
                </div>
              </div>
              {shipment.delay ? (
                <p className="text-sm text-red-500 mt-1">
                  Delayed by {shipment.delay} days
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};