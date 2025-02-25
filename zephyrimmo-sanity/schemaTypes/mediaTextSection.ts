import { defineField, defineType } from "sanity"

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
    ],
    fields: [
        defineField({
            name: 'layout',
            type: 'string',
            title: 'Disposition',
            options: {
              list: [
                { title: 'Image | Texte', value: 'image_text' },
                { title: 'Texte | Image', value: 'text_image' },
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
                { title: 'Clair', value: 'light' },
                { title: 'Sombre', value: 'dark' },
              ],
              layout: 'radio', // Displays options as radio buttons
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            title: 'Titre',
            name: 'title',
            type: 'string',
            group: 'text'
        }),
        defineField({
            title: 'Description',
            name: 'description',
            type: "array",
            of: [
                { type: "block" },
            ],
            group: 'text'
        }),
        defineField({
            title: 'Texte de l\'appel à l\'action',
            name: 'ctaText',
            type: 'string',
        }),
        defineField({
            title: 'Brochure',
            name: 'brochure',
            type: 'file',
            fields: [],
            options: {
                accept: 'application/pdf'
            },
            hidden: ({ parent }) => !!parent?.ctaUrl,
        }),
        defineField({
            title: 'URL de l\'appel à l\'action',
            name: 'ctaUrl',
            type: 'url',
            initialValue: "#",
            hidden: ({ parent }) => !!parent?.brochure,
            validation: (rule) => rule
                .uri({
                    allowRelative: true
                }),
        }),
        defineField({
            title: 'Image',
            name: 'image',
            type: 'image',
            group: 'media',
            options: {
                hotspot: true // <-- Defaults to false
            }
        }),
    ]
});