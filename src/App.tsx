import React from 'react';
import { MetricCard } from './components/MetricCard';
import { SupplierTable } from './components/SupplierTable';
import { ShipmentTracker } from './components/ShipmentTracker';
import { suppliers, inventory, shipments, performanceMetrics } from './data';
import { BarChart, TrendingUp, Package, Truck, DollarSign } from 'lucide-react';

function App() {
  const latestMetrics = performanceMetrics[performanceMetrics.length - 1];
  const previousMetrics = performanceMetrics[performanceMetrics.length - 2];

  const calculateTrend = (current: number, previous: number) => {
    return Number(((current - previous) / previous * 100).toFixed(1));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Supply Chain Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Generate Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Order Fulfillment Rate"
            value={`${(latestMetrics.orderFulfillmentRate * 100).toFixed(1)}%`}
            trend={calculateTrend(latestMetrics.orderFulfillmentRate, previousMetrics.orderFulfillmentRate)}
            icon={<BarChart />}
          />
          <MetricCard
            title="Inventory Turnover"
            value={latestMetrics.inventoryTurnover.toFixed(2)}
            trend={calculateTrend(latestMetrics.inventoryTurnover, previousMetrics.inventoryTurnover)}
            icon={<TrendingUp />}
          />
          <MetricCard
            title="Supplier Reliability"
            value={`${(latestMetrics.supplierReliability * 100).toFixed(1)}%`}
            trend={calculateTrend(latestMetrics.supplierReliability, previousMetrics.supplierReliability)}
            icon={<Package />}
          />
          <MetricCard
            title="Cost Efficiency"
            value={`${(latestMetrics.costEfficiency * 100).toFixed(1)}%`}
            trend={calculateTrend(latestMetrics.costEfficiency, previousMetrics.costEfficiency)}
            icon={<DollarSign />}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Supplier Performance */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Supplier Performance</h2>
            <SupplierTable suppliers={suppliers} />
          </div>

          {/* Shipment Tracking */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Shipment Tracking</h2>
            <ShipmentTracker shipments={shipments} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;