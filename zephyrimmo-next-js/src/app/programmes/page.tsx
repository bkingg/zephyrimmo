import PageHeader from "@/components/PageHeader";
import urlFor from "@/lib/urlFor";
import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import { Metadata } from "next";
import ProgrammesPage from "@/components/ProgrammesPage";

interface Programme {
  _id: string;
  title: string;
  slug: { current: string };
  image: string;
  imageUrl: string;
  niveau?: string;
}

export const metadata: Metadata = {
  title: "Programmes",
  description: "Liste des Programmes",
};

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

export default async function Programmes() {
  const siteSettings = await sanityFetch<SanityDocument>({
    query: SITE_SETTINGS_QUERY,
  });

  let programmes: Programme[] = [];
  let niveaux: string[] = ["Tous"];

  {
    siteSettings.mainMenu?.items?.map((menuItem: any) => {
      const niveau = menuItem?.title;
      if (menuItem?.internalLink?._type == "programme") {
        menuItem.internalLink.niveau = niveau;
        menuItem.internalLink.imageUrl = menuItem.internalLink.image
          ? urlFor(menuItem.internalLink.image).size(500, 500).fit("crop").url()
          : "";
        if (
          !programmes.some(
            (programme) => programme._id === menuItem?.internalLink?._id
          )
        ) {
          programmes = [...programmes, menuItem?.internalLink];
        }
      }

      {
        menuItem?.submenuItems?.map((menuItem: any) => {
          if (menuItem?.internalLink?._type == "programme") {
            menuItem.internalLink.niveau = niveau;
            menuItem.internalLink.imageUrl = menuItem.internalLink.image
              ? urlFor(menuItem.internalLink.image)
                  .size(500, 500)
                  .fit("crop")
                  .url()
              : "";
            if (
              !programmes.some(
                (programme) => programme._id === menuItem?.internalLink?._id
              )
            ) {
              programmes = [...programmes, menuItem?.internalLink];
            }
          }

          {
            menuItem?.submenuItems?.map((menuItem: any) => {
              if (menuItem?.internalLink?._type == "programme") {
                menuItem.internalLink.niveau = niveau;
                menuItem.internalLink.imageUrl = menuItem.internalLink.image
                  ? urlFor(menuItem.internalLink.image)
                      .size(500, 500)
                      .fit("crop")
                      .url()
                  : "";
                if (
                  !programmes.some(
                    (programme) => programme._id === menuItem?.internalLink?._id
                  )
                ) {
                  programmes = [...programmes, menuItem?.internalLink];
                }
              }
            });
          }
        });
      }

      const menuItemContainsProgramme = menuItem?.submenuItems?.some(
        (menuItem: any) => {
          const menuItemContainsProgramme =
            menuItem?.internalLink?._type === "programme" ||
            menuItem?.submenuItems?.some((menuItem: any) => {
              return menuItem?.internalLink?._type === "programme";
            });
          return menuItemContainsProgramme;
        }
      );
      if (menuItemContainsProgramme) niveaux = [...niveaux, menuItem.title];
    });
  }

  return (
    <>
      <PageHeader>
        <h1 className="page__title">Programmes</h1>
      </PageHeader>
      <div className="section">
        <div className="container">
          <ProgrammesPage niveaux={niveaux} programmes={programmes} />
        </div>
      </div>
    </>
  );
}
