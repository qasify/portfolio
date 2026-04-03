import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords / Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'filterTags',
      title: 'Filter Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Categories for filtering the project list',
    }),
    defineField({
      name: 'geoRestriction',
      title: 'Geo Restriction',
      type: 'object',
      fields: [
        { name: 'message', type: 'string', title: 'Message' },
        { name: 'regions', type: 'array', of: [{ type: 'string' }], title: 'Regions' },
      ],
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'object',
      fields: [
        { name: 'screenshots', type: 'array', of: [{ type: 'image' }], title: 'Screenshots' },
        { name: 'recordings', type: 'array', of: [{ type: 'file' }], title: 'Recordings' }, // Or mux.video if added later
      ],
    }),
    defineField({
      name: 'details',
      title: 'Details (Long Form)',
      type: 'array',
      of: [{ type: 'block' }], // Portable text representation
    }),
  ],
})
