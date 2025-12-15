export type LotStatus = 'available' | 'reserved' | 'sold';

export type LotType = 'townhouse' | 'villa' | 'premium' | 'commercial';

export interface LotData {
  id: string;
  number: string;
  type: LotType;
  status: LotStatus;
  price: number;
  area: number; // in m2
  description: string;
  features: string[];
  // 3D Properties
  position: [number, number, number];
  rotation: [number, number, number];
  dimensions: [number, number, number]; // width, height (thickness), depth
}

export interface AmenityData {
  id: string;
  name: string;
  type: 'park' | 'sports' | 'commercial';
  description: string;
  position: [number, number, number];
  dimensions: [number, number, number];
}
