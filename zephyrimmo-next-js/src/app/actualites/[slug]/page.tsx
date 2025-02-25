import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import { PortableText } from "@portabletext/react";
import urlFor from "@/lib/urlFor";
import PageHeader from "@/components/PageHeader";
import { parseISO, format, formatDistance } from "date-fns";
import { fr } from "date-fns/locale";
import { notFound } from "next/navigation";
import Tags from "@/components/Tags";
import { ResolvingMetadata, Metadata } from "next";
import page from "../page";

let actualite: SanityDocument;
let actualiteImageUrl: string;

export default async function Actualite({
  params,
}: {
  params: { slug: string };
}) {
  const ACTUALITE_QUERY = groq`
    *[
      _type == "article"
      && defined(slug.current)
      && slug.current == "${params.slug}"
    ][0]{
      _id, 
      title, 
      image, 
      tags[], 
      slug, 
      description, 
      _createdAt
    }`;
  actualite = await sanityFetch<SanityDocument>({
    query: ACTUALITE_QUERY,
  });

  if (!actualite) notFound();

  actualiteImageUrl = urlFor(actualite?.image).width(1000).url();

  return (
    <>
      <PageHeader image={actualiteImageUrl}>
        <h1 className="page__title">{actualite.title}</h1>
      </PageHeader>
      <div className="section container">
        <PortableText value={actualite.description} />
        <p className="pt-5">
          <i className="bi bi-tag pe-1"></i>
          <Tags tags={actualite.tags} />
        </p>
        <p>
          Publié il y a&nbsp;
          <time dateTime={actualite._createdAt}>
            {formatDistance(Date.now(), parseISO(actualite._createdAt), {
              locale: fr,
            })}
          </time>
        </p>
      </div>
    </>
  );
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: actualite?.title,
    openGraph: {
      images: [actualiteImageUrl],
    },
  };
}
