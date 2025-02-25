import { PortableText } from "@portabletext/react";
import LatestArticlesSection from "./LatestArticlesSection";
import LogoListSection from "./LogoListSection";
import RichTextSection from "./RichTextSection";
import SliderSection from "./SliderSection";
import CallToActionSection from "./CallToActionSection";
import ServicesSection from "./ServicesSection";
import FAQSection from "./FAQSection";
import MediaTextSection from "./MediaTextSection";

interface SectionsProps {
  sections: Section[];
}

interface Section {}

export default async function Sections({ sections }: SectionsProps) {
  return (
    <>
      {sections.map(
        (section: any) =>
          (section._type == "rich_text" && (
            <RichTextSection key={section._key} section={section} />
          )) ||
          (section._type == "media_text" && (
            <MediaTextSection key={section._key} section={section} />
          )) ||
          (section._type == "slider" && (
            <SliderSection key={section._key} slides={section.slides} />
          )) ||
          (section._type == "faq" && (
            <FAQSection key={section._key} section={section} />
          )) ||
          (section._type == "logo_list" && (
            <LogoListSection key={section._key} section={section} />
          )) ||
          (section._type == "call_to_action" && (
            <CallToActionSection key={section._key} section={section} />
          )) ||
          (section._type == "latest_articles" && (
            <LatestArticlesSection key={section._key} section={section} />
          )) ||
          (section._type == "services" && (
            <ServicesSection key={section._key} section={section} />
          ))
      )}
    </>
  );
}
