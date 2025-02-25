import siteSettings from "./siteSettings";
import menuItemType from "./menuItemType";
import menuType from "./menuType";
import pageType from "./pageType";
import articleType from "./articleType";
import serviceType from "./serviceType";
import textWithLinksBlock from "./textWithLinksBlock";

// Sections
import latestArticlesSection from "./latestArticlesSection";
import richTextSection from "./richTextSection";
import sliderSection from "./sliderSection";
import logoListSection from "./logoListSection";
import callToActionSection from "./callToActionSection";
import servicesSection from "./servicesSection";
import faqSection from "./faqSection";
import mediaTextSection from "./mediaTextSection";

export const schemaTypes = [
    siteSettings,
    menuType,
    menuItemType,
    pageType,
    serviceType,
    articleType,
    
    // Sections
    richTextSection,
    sliderSection,
    faqSection,
    logoListSection,
    latestArticlesSection,
    textWithLinksBlock,
    callToActionSection,
    servicesSection,
    mediaTextSection
]
