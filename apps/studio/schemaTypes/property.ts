import { defineArrayMember, defineField, defineType } from 'sanity';

export const property = defineType({
  name: 'property',
  title: 'Propiedad',
  type: 'document',
  groups: [
    { name: 'general', title: 'Información principal', default: true },
    { name: 'details', title: 'Características' },
    { name: 'photos', title: 'Fotografías' },
  ],
  initialValue: { status: 'available', operation: 'sale', currency: 'UF', featured: false },
  fields: [
    defineField({
      name: 'title', title: 'Título', type: 'string', group: 'general',
      description: 'Un título breve que destaque lo especial de la propiedad.',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug', title: 'Dirección de la página', type: 'slug', group: 'general',
      description: 'Usa Generar a partir del título. Evita cambiarla después de publicar.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type', title: 'Tipo de propiedad', type: 'string', group: 'general',
      options: { list: [{ title: 'Casa', value: 'house' }, { title: 'Departamento', value: 'apartment' }, { title: 'Terreno', value: 'land' }, { title: 'Oficina', value: 'office' }] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'operation', title: 'Operación', type: 'string', group: 'general',
      options: { list: [{ title: 'Venta', value: 'sale' }, { title: 'Arriendo', value: 'rent' }], layout: 'radio' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status', title: 'Disponibilidad', type: 'string', group: 'general',
      description: 'El borrador y la publicación se gestionan con los botones de Sanity. Este campo indica la disponibilidad comercial.',
      options: { list: [
        { title: 'Disponible', value: 'available' }, { title: 'Reservada', value: 'reserved' },
        { title: 'Vendida', value: 'sold' }, { title: 'Arrendada', value: 'rented' },
        { title: 'Archivada', value: 'archived' },
      ] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured', title: 'Destacar en la página de inicio', type: 'boolean', group: 'general',
    }),
    defineField({
      name: 'location', title: 'Ubicación pública', type: 'string', group: 'general',
      description: 'Comuna o sector que aparecerá en la web. No ingreses datos privados del propietario.',
      validation: (Rule) => Rule.required().max(150),
    }),
    defineField({
      name: 'price', title: 'Precio', type: 'number', group: 'general',
      description: 'Para arriendo, indica el valor mensual.',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'currency', title: 'Moneda', type: 'string', group: 'general',
      options: { list: [{ title: 'UF', value: 'UF' }, { title: 'Pesos chilenos', value: 'CLP' }] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description', title: 'Descripción', type: 'text', rows: 6, group: 'details',
      validation: (Rule) => Rule.required().min(30),
    }),
    defineField({
      name: 'bedrooms', title: 'Dormitorios', type: 'number', group: 'details',
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: 'bathrooms', title: 'Baños', type: 'number', group: 'details',
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: 'areaM2', title: 'Superficie interior (m²)', type: 'number', group: 'details',
      hidden: ({ document }) => document?.type === 'land',
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: 'landAreaM2', title: 'Superficie de terreno (m²)', type: 'number', group: 'details',
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: 'features', title: 'Características adicionales', type: 'array', group: 'details',
      description: 'Por ejemplo: terraza, bodega o estacionamiento.',
      of: [defineArrayMember({ type: 'string', validation: (Rule) => Rule.required() })],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'photos', title: 'Fotografías', type: 'array', group: 'photos',
      description: 'La primera foto será la portada. Arrastra las fotos para cambiar el orden.',
      of: [defineArrayMember({
        name: 'propertyPhoto', type: 'image', title: 'Fotografía', options: { hotspot: true },
        validation: (Rule) => Rule.required().assetRequired(),
        fields: [
          defineField({ name: 'alt', title: 'Descripción de la imagen', type: 'string',
            description: 'Describe lo que se ve para personas que utilizan lectores de pantalla.',
            validation: (Rule) => Rule.required().max(200) }),
        ],
      })],
      validation: (Rule) => Rule.required().min(1).max(30),
    }),
  ],
  preview: {
    select: { title: 'title', location: 'location', status: 'status', media: 'photos.0' },
    prepare({ title, location, status, media }) {
      const labels: Record<string, string> = { available: 'Disponible', reserved: 'Reservada', sold: 'Vendida', rented: 'Arrendada', archived: 'Archivada' };
      return { title, subtitle: [labels[status] || status, location].filter(Boolean).join(' · '), media };
    },
  },
});
