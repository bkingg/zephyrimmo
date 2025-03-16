import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'media_text',
  type: 'object',
  title: 'Texte et Media',
  groups: [
    {
      name: 'text',
      title: 'Texte',
    },
    {
      name: 'media',
      title: 'Média',
    },
    {
      name: 'cta',
      title: "Appel a l'action",
    },
  ],
  fields: [
    defineField({
      name: 'layout',
      type: 'string',
      title: 'Disposition',
      options: {
        list: [
          {title: 'Image | Texte', value: 'image_text'},
          {title: 'Texte | Image', value: 'text_image'},
        ],
        layout: 'radio', // Displays options as radio buttons
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'layoutColor',
      type: 'string',
      title: 'Couleur',
      options: {
        list: [
          {title: 'Clair', value: 'light'},
          {title: 'Sombre', value: 'dark'},
        ],
        layout: 'radio', // Displays options as radio buttons
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Titre',
      name: 'title',
      type: 'string',
      group: 'text',
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
      group: 'text',
    }),
    defineField({
      title: "Texte de l'appel à l'action",
      name: 'ctaText',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'linkType',
      type: 'string',
      title: 'Type de lien',
      group: 'cta',
      options: {
        list: [
          {title: 'URL Interne', value: 'internal'},
          {title: 'URL Externe', value: 'external'},
        ],
        layout: 'radio', // Displays options as radio buttons
      },
      initialValue: 'internal',
    }),
    defineField({
      name: 'internalLink',
      type: 'reference',
      title: 'Internal Page/Post',
      group: 'cta',
      description: 'Select an internal page or post',
      to: [{type: 'page'}, {type: 'service'}, {type: 'projet'}, {type: 'article'}],
      hidden: ({parent}) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'externalUrl',
      type: 'url',
      title: 'External URL',
      group: 'cta',
      description: 'Enter an external URL',
      hidden: ({parent}) => parent?.linkType !== 'external',
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true, // <-- Defaults to false
      },
    }),
  ],
})
