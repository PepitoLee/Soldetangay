import { LotData, AmenityData } from './types';

// --- Configuration & Layout Constants ---

const LOT_WIDTH = 10;
const LOT_DEPTH = 14;
// const LOT_SPACING = 2; // unused

// Price Helper
const generatePrice = (area: number, type: string) => {
  const baseRate = type === 'premium' ? 1200 : type === 'villa' ? 1000 : 850;
  return area * baseRate;
};

const generateStatus = () => {
    const r = Math.random();
    if (r > 0.85) return 'sold';
    if (r > 0.7) return 'reserved';
    return 'available';
};

// --- Data Generation ---

const lots: LotData[] = [];
let lotCounter = 1;

// 1. PERIMETER LOTS (The Outer Ring)
// Top Row (22 lots)
for (let i = 0; i < 22; i++) {
    const x = (i * (LOT_WIDTH + 2)) - 130;
    lots.push({
        id: `P-N-${lotCounter++}`,
        number: `N-${100 + i}`,
        type: 'townhouse',
        status: generateStatus(),
        area: 140,
        price: generatePrice(140, 'townhouse'),
        description: 'Lote perimetral norte con fácil acceso a la avenida principal.',
        features: ['Acceso Rápido', 'Jardín Trasero', 'Seguridad 24/7'],
        position: [x, 0.2, -65],
        rotation: [0, 0, 0],
        dimensions: [LOT_WIDTH, 0.5, LOT_DEPTH]
    });
}

// Bottom Row (22 lots)
for (let i = 0; i < 22; i++) {
    const x = (i * (LOT_WIDTH + 2)) - 130;
    lots.push({
        id: `P-S-${lotCounter++}`,
        number: `S-${200 + i}`,
        type: 'townhouse',
        status: generateStatus(),
        area: 140,
        price: generatePrice(140, 'townhouse'),
        description: 'Lote perimetral sur, zona tranquila alejada del ruido.',
        features: ['Zona Silenciosa', 'Vista al Valle'],
        position: [x, 0.2, 65],
        rotation: [0, 0, 0],
        dimensions: [LOT_WIDTH, 0.5, LOT_DEPTH]
    });
}

// Left Side (5 lots)
for (let i = 0; i < 5; i++) {
     lots.push({
        id: `P-W-${lotCounter++}`,
        number: `W-${300 + i}`,
        type: 'premium',
        status: generateStatus(),
        area: 200,
        price: generatePrice(200, 'premium'),
        description: 'Lote premium cerca de la entrada principal.',
        features: ['Lote de Esquina', 'Alta Plusvalía'],
        position: [-145, 0.2, (i * 20) - 40],
        rotation: [0, Math.PI/2, 0],
        dimensions: [LOT_WIDTH, 0.5, LOT_DEPTH + 4]
    });
}

// Right Side (5 lots)
for (let i = 0; i < 5; i++) {
    lots.push({
        id: `P-E-${lotCounter++}`,
        number: `E-${400 + i}`,
        type: 'premium',
        status: generateStatus(),
        area: 200,
        price: generatePrice(200, 'premium'),
        description: 'Lote premium al fondo del desarrollo, máxima privacidad.',
        features: ['Privacidad Total', 'Sin Vecinos al Fondo'],
        position: [145, 0.2, (i * 20) - 40],
        rotation: [0, Math.PI/2, 0],
        dimensions: [LOT_WIDTH, 0.5, LOT_DEPTH + 4]
    });
}

// 2. CENTRAL SECTIONS (The 6 Internal Blocks)
// Layout: [Rec] [Houses A] [Green] [Houses B] [Pets] [Houses C]
// Centers X approx: -100, -60, -20, 20, 60, 100

// Helper to create a block of houses (12 houses per block: 2 rows of 6)
const createHousingBlock = (centerX: number, prefix: string, startNum: number) => {
    for(let i=0; i<6; i++) {
        // Top sub-row
        lots.push({
            id: `I-${prefix}T-${i}`,
            number: `C-${startNum + i}`,
            type: 'villa',
            status: generateStatus(),
            area: 160,
            price: generatePrice(160, 'villa'),
            description: 'Villa céntrica con acceso directo a las amenidades.',
            features: ['Ubicación Céntrica', 'Acabados Modernos'],
            position: [centerX - 25 + (i * 10), 0.2, -10],
            rotation: [0, 0, 0],
            dimensions: [8, 0.5, 12]
        });
        // Bottom sub-row
        lots.push({
            id: `I-${prefix}B-${i}`,
            number: `C-${startNum + 10 + i}`,
            type: 'villa',
            status: generateStatus(),
            area: 160,
            price: generatePrice(160, 'villa'),
            description: 'Villa céntrica frente a zona peatonal.',
            features: ['Frente a Parque', 'Diseño Abierto'],
            position: [centerX - 25 + (i * 10), 0.2, 10],
            rotation: [0, 0, 0],
            dimensions: [8, 0.5, 12]
        });
    }
};

// Section 2: Housing A (X ~ -60)
createHousingBlock(-60, 'A', 500);

// Section 4: Housing B (X ~ 20)
createHousingBlock(20, 'B', 600);

// Section 6: Housing C (X ~ 100)
createHousingBlock(100, 'C', 700);


export const ALL_LOTS = lots;

// --- AMENITIES DATA ---
// Sections 1, 3, and 5

export const AMENITIES: AmenityData[] = [
  {
    id: 'rec-center',
    name: 'Club Recreativo & Piscinas',
    type: 'sports',
    description: 'Complejo acuático con piscina semi-olímpica, área de tumbonas y casa club para eventos sociales. (Sección 1)',
    position: [-110, 0.1, 0], // Section 1 (Far Left)
    dimensions: [30, 0.3, 30]
  },
  {
    id: 'central-park',
    name: 'Gran Parque Central',
    type: 'park',
    description: 'El corazón verde del proyecto. Senderos para jogging, áreas de yoga y lagos artificiales. (Sección 3)',
    position: [-20, 0.1, 0], // Section 3 (Middle Left)
    dimensions: [30, 0.3, 30]
  },
  {
    id: 'pet-zone',
    name: 'Pet Park & Zona Agility',
    type: 'park',
    description: 'Espacio diseñado para tus mascotas con circuitos de agilidad, bebederos y zonas de descanso. (Sección 5)',
    position: [60, 0.1, 0], // Section 5 (Middle Right)
    dimensions: [30, 0.3, 30]
  },
  {
    id: 'commercial-front',
    name: 'Plaza de Acceso',
    type: 'commercial',
    description: 'Locales comerciales justo a la entrada para tu conveniencia diaria.',
    position: [-170, 0.1, 40], // Near entrance
    dimensions: [15, 4, 20]
  },
];

export const STATUS_COLORS: Record<string, { fill: string; hex: string; label: string }> = {
  available: { fill: '#34d399', hex: '#34d399', label: 'Disponible' },
  reserved: { fill: '#fbbf24', hex: '#fbbf24', label: 'Reservado' },
  sold: { fill: '#94a3b8', hex: '#94a3b8', label: 'Vendido' },
};

export const TYPE_COLORS = {
  townhouse: 'bg-orange-100 text-orange-800',
  villa: 'bg-blue-100 text-blue-800',
  premium: 'bg-slate-100 text-slate-800',
  commercial: 'bg-purple-100 text-purple-800',
};
