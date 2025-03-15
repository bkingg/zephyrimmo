import PageHeader from "@/components/PageHeader";
import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import Link from "next/link";
import ProjetCard from "@/components/ProjetCard";
import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import urlFor from "@/lib/urlFor";

const SITE_SETTINGS_QUERY = groq`*[
    _type == "siteSettings"
  ][0]{
    projetsPageImage,
  }`;

const PROJETS_QUERY = groq`*[
  _type == "projet"
  && defined(slug.current)
] | order(_createdAt desc)
{_id, title, ville, slug, image, description}`;

export default async function Actualites() {
  const siteSettings = await sanityFetch<SanityDocument>({
    query: SITE_SETTINGS_QUERY,
  });

  const projetsPageImageUrl = siteSettings?.projetsPageImage
    ? urlFor(siteSettings?.projetsPageImage)
        .size(1000, 1000)
        .crop("center")
        .url()
    : "";

  const projets = await sanityFetch<SanityDocument[]>({
    query: PROJETS_QUERY,
  });

  return (
    <>
      <PageHeader image={projetsPageImageUrl}>
        <h1 className="page__title">Projets</h1>

        <Breadcrumb className="page__header__breadcrumb">
          <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
          <BreadcrumbItem active>Projets</BreadcrumbItem>
        </Breadcrumb>
      </PageHeader>
      <div className="section section-animate">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2">
            {projets.length === undefined && <p>Aucun Projet disponible.</p>}
            {projets.map((projet) => {
              return <ProjetCard key={projet._id} projet={projet} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
