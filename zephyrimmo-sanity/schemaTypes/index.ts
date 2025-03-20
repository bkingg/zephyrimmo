import siteSettings from './siteSettings'
import menuItemType from './menuItemType'
import menuType from './menuType'
import pageType from './pageType'
import articleType from './articleType'
import serviceType from './serviceType'
import textWithLinksBlock from './textWithLinksBlock'
import projetType from './projetType'

// Sections
import latestArticlesSection from './latestArticlesSection'
import richTextSection from './richTextSection'
import sliderSection from './sliderSection'
import logoListSection from './logoListSection'
import callToActionSection from './callToActionSection'
import servicesSection from './servicesSection'
import projetsSection from './projetsSection'
import faqSection from './faqSection'
import mediaTextSection from './mediaTextSection'
import temoignagesSection from './temoignagesSection'

export const schemaTypes = [
  menuType,
  menuItemType,
  pageType,
  serviceType,
  projetType,
  articleType,
  siteSettings,

  // Sections
  richTextSection,
  sliderSection,
  faqSection,
  logoListSection,
  latestArticlesSection,
  textWithLinksBlock,
  callToActionSection,
  servicesSection,
  projetsSection,
  mediaTextSection,
  temoignagesSection,
]
