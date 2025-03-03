import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {frFRLocale} from '@sanity/locale-fr-fr'
import {tags} from 'sanity-plugin-tags'
import { iconPicker } from 'sanity-plugin-icon-picker';


export default defineConfig({
  name: 'default',
  title: 'Zephyr Immo',

  projectId: 'nb0q6w1h',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), frFRLocale(), tags({}), iconPicker()],

  schema: {
    types: schemaTypes,
  },
})
