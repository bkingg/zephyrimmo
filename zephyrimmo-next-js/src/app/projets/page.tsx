import PageHeader from "@/components/PageHeader";
import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import Link from "next/link";
import ProjetCard from "@/components/ProjetCard";

const PROJETS_QUERY = groq`*[
  _type == "projet"
  && defined(slug.current)
] | order(_createdAt desc)
{_id, title, ville, slug, image, description}`;

export default async function Actualites() {
  const projets = await sanityFetch<SanityDocument[]>({
    query: PROJETS_QUERY,
  });

  return (
    <>
      <PageHeader>
        <h1 className="page__title">Projets</h1>
      </PageHeader>
      <div className="section">
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
