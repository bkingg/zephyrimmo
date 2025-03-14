import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import Link from "next/link";
import Navigation from "./Navigation";
import urlFor from "@/lib/urlFor";

const MENU_ITEM_FRAGMENT = groq`
  _key,
  title,
  linkType,
  internalLink->{_id, _type, title, slug, image},
  externalUrl,
  submenuItems[]`;

const SITE_SETTINGS_QUERY = groq`*[
  _type == "siteSettings"
][0]{
  logo,
  mainMenu->{
    _id, 
    title, 
    handle,
    items[]{
      ${MENU_ITEM_FRAGMENT}{
        ${MENU_ITEM_FRAGMENT}{
          ${MENU_ITEM_FRAGMENT}
        }
      }
    }
  },
}`;

export default async function Header() {
  const siteSettings = await sanityFetch<SanityDocument>({
    query: SITE_SETTINGS_QUERY,
  });

  siteSettings.logoUrl = urlFor(siteSettings.logo).width(200).url();

  console.log(siteSettings);

  return (
    <>
      <Navigation siteSettings={siteSettings} />
    </>
  );
}
