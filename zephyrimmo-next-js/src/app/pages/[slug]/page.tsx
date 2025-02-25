import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import urlFor from "@/lib/urlFor";
import { notFound } from "next/navigation";
import Sections from "@/components/sections/Sections";
import { Metadata, ResolvingMetadata } from "next";

export default async function Page({ params }: { params: { slug: string } }) {
  const PAGE_QUERY = groq`
    *[
      _type == "page"
      && defined(slug.current)
      && slug.current == "${params.slug}"
    ][0]{
      _id, title, slug, image, 
      sections[]{
        ...,
        "brochureUrl": brochure.asset->url,
      },
    }`;
  const page = await sanityFetch<SanityDocument>({ query: PAGE_QUERY });

  if (!page) notFound();

  page.imageUrl = page.image
    ? urlFor(page.image).size(1000, 1000).crop("center").url()
    : undefined;

  return (
    <>
      <PageHeader image={page.imageUrl}>
        {page.title && <h1 className="page__title">{page.title}</h1>}
        {page.description && <p>{page.description}</p>}
      </PageHeader>
      {page.sections && <Sections sections={page.sections} />}
    </>
  );
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const PAGE_QUERY = groq`
    *[
      _type == "page"
      && defined(slug.current)
      && slug.current == "${params.slug}"
    ][0]{
      title, image
    }`;
  const page = await sanityFetch<SanityDocument>({ query: PAGE_QUERY });

  return {
    title: page?.title,
    openGraph: {
      images: [page?.imageUrl],
    },
  };
}
