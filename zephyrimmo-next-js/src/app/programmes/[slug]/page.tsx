import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import urlFor from "@/lib/urlFor";
import PageHeader from "@/components/PageHeader";
import { notFound } from "next/navigation";
import Sections from "@/components/sections/Sections";
import { ResolvingMetadata, Metadata } from "next";
import RegisterToProgramForm from "@/components/RegisterToProgramForm";

let programme: SanityDocument;

export default async function Page({ params }: { params: { slug: string } }) {
  const PROGRAMME_QUERY = groq`
  *[
    _type == "programme"
    && defined(slug.current)
    && slug.current == "${params.slug}"
  ][0]{
    _id, title, image, slug, description, 
    sections[]{
      ...,
      "brochureUrl": brochure.asset->url,
    },
  }`;

  programme = await sanityFetch<SanityDocument>({
    query: PROGRAMME_QUERY,
  });

  if (!programme) notFound();

  programme.imageUrl = programme.image
    ? urlFor(programme.image).width(1000).url()
    : "";

  return (
    <div className="programme">
      <PageHeader image={programme.imageUrl}>
        <h1 className="page__title">{programme.title}</h1>
      </PageHeader>
      <div className="container">
        <div className="row">
          <div className="programme__content col-lg-8">
            {programme.sections && <Sections sections={programme.sections} />}
          </div>
          <div className="col-lg-4">
            <div className="section">
              <div className="register-to-program__form">
                <h2>S&apos;inscrire</h2>
                <RegisterToProgramForm programme={programme} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const PROGRAMME_QUERY = groq`
  *[
    _type == "programme"
    && defined(slug.current)
    && slug.current == "${params.slug}"
  ][0]{
    title, image
  }`;

  const programme = await sanityFetch<SanityDocument>({
    query: PROGRAMME_QUERY,
  });
  return {
    title: programme?.title,
    openGraph: {
      images: [programme?.imageUrl],
    },
  };
}
