import type { ImageMetadata } from 'astro';
import interior from '../assets/interior.jpg';
import house from '../assets/house.jpg';
import apartment from '../assets/apartment.jpg';

export interface Property {
  slug: string;
  title: string;
  type: 'Casa' | 'Departamento';
  location: string;
  priceUf: number;
  bedrooms: number;
  bathrooms: number;
  areaM2: number;
  description: string;
  features: string[];
  image: ImageMetadata;
  imageAlt: string;
  isExample: true;
}

// Fictional examples for design review. These are not active listings.
export const properties: Property[] = [
  {
    slug: 'casa-con-jardin',
    title: 'Una casa para disfrutar al aire libre',
    type: 'Casa',
    location: 'Sector residencial',
    priceUf: 9800, bedrooms: 4, bathrooms: 3, areaM2: 180,
    description: 'Una casa pensada para compartir en familia, con espacios amplios y conexión con el exterior. Su distribución permite imaginar distintos usos para cada ambiente, desde un lugar de encuentro hasta un rincón de trabajo.',
    features: ['Jardín privado', 'Terraza', 'Cocina integrada', 'Dos estacionamientos'],
    image: house, imageAlt: 'Casa contemporánea con grandes ventanales y espacios exteriores.', isExample: true,
  },
  {
    slug: 'departamento-luminoso',
    title: 'Luz y calma en cada rincón',
    type: 'Departamento',
    location: 'Sector urbano',
    priceUf: 5200, bedrooms: 2, bathrooms: 2, areaM2: 78,
    description: 'Un departamento con ambientes luminosos y una distribución práctica para el día a día. El espacio principal reúne las áreas de descanso y encuentro en una propuesta acogedora.',
    features: ['Balcón', 'Dormitorio principal en suite', 'Cocina equipada', 'Un estacionamiento'],
    image: interior, imageAlt: 'Living en tonos cálidos con luz natural.', isExample: true,
  },
  {
    slug: 'departamento-amplio',
    title: 'Espacio para una nueva etapa',
    type: 'Departamento',
    location: 'Sector residencial',
    priceUf: 7400, bedrooms: 3, bathrooms: 2, areaM2: 110,
    description: 'Un departamento con espacios flexibles para distintas etapas de la vida. Sus tres dormitorios permiten combinar descanso, trabajo y tiempo en familia.',
    features: ['Living y comedor', 'Espacio para escritorio', 'Bodega', 'Un estacionamiento'],
    image: apartment, imageAlt: 'Interior residencial contemporáneo.', isExample: true,
  },
];

export const formatPrice = (value: number) =>
  'UF ' + new Intl.NumberFormat('es-CL', { maximumFractionDigits: 0 }).format(value);
