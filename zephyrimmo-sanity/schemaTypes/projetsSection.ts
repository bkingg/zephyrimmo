import { defineField, defineType } from "sanity"

export default defineType({
    name: 'projets', 
    type: 'object',
    title: 'Projets',
    fields: [
        defineField({
            title: 'Titre',
            name: 'title',
            type: 'string',
        }),
        defineField({
            title: 'Description',
            name: 'description',
            type: 'text',
        }),
        defineField({
            name: 'projets',
            title: 'Projets',
            type: 'array',
            of: [
              {
                type: 'reference',
                to: [
                  { type: 'projet' },
                ],
              },
            ],
            validation: (Rule) => Rule.max(8).warning('Vous ne pouvez ajouter que 8 services.'),
        }),
        defineField({
            title: 'CTA Texte',
            name: 'ctaText',
            type: 'string',
        }),
        defineField({
            title: 'CTA URL',
            name: 'ctaUrl',
            type: 'url',
            initialValue: "#",
            validation: (rule) => rule
                .required()
                .uri({
                    allowRelative: true
                }),
        }),
    ],
    initialValue: {
        title: 'Nos Projets',
        description: "Découvrez nos projets"
    }
});