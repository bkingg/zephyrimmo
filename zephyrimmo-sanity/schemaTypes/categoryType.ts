import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Categories',
  name: 'category',
  type: 'document',
  fields: [
    defineField({
      title: 'Nom',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'tags',
      title: 'Balises',
      type: 'tags',
      options: {
        includeFromRelated: 'tags',
      },
    }),
  ],
})
