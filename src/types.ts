export interface Supplier {
  id: string;
  name: string;
  reliability: number;
  leadTime: number;
  costPerUnit: number;
  location: string;
}

export interface Inventory {
  id: string;
  productName: string;
  stockLevel: number;
  reorderPoint: number;
  maxCapacity: number;
  turnoverRate: number;
}

export interface ShipmentStatus {
  id: string;
  origin: string;
  destination: string;
  status: 'in-transit' | 'delivered' | 'delayed';
  estimatedArrival: string;
  actualArrival?: string;
  delay?: number;
}

export interface PerformanceMetric {
  date: string;
  orderFulfillmentRate: number;
  inventoryTurnover: number;
  supplierReliability: number;
  costEfficiency: number;
}