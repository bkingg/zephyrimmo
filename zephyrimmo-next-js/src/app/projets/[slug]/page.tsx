import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import { PortableText } from "@portabletext/react";
import urlFor from "@/lib/urlFor";
import PageHeader from "@/components/PageHeader";
import { notFound } from "next/navigation";
import { ResolvingMetadata, Metadata } from "next";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { Icon } from "@iconify/react";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

let projet: SanityDocument;
let projetImageUrl: string;

export default async function Projet({ params }: { params: { slug: string } }) {
  console.log("params", params);

  const PROJET_QUERY = groq`
    *[
      _type == "projet"
      && defined(slug.current)
      && slug.current == "${params.slug}"
    ][0]{
      _id, 
      ville,
      title, 
      image, 
      slug, 
      description, 
      proprietes[]{
        _key,
        icon,
        title,
        subtitle
      },
      gallery[]{
        _key,
        asset
      }
    }`;
  projet = await sanityFetch<SanityDocument>({
    query: PROJET_QUERY,
  });

  if (!projet) notFound();

  projetImageUrl = urlFor(projet?.image).width(1000).url();

  return (
    <>
      <div className="section projet container">
        <div className="row">
          <div className="col-sm-6">
            <p>{projet.ville}</p>
            <h1 className={`${playfairDisplay.className} text-start`}>
              {projet.title}
            </h1>
          </div>
          <div className="col-sm-6">
            <p>{projet.description}</p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row row-cols-2 row-cols-md-3 row-cols-md-5 justify-content-center">
          {projet.proprietes.map((propriete) => {
            return (
              <div className="col">
                <div className="d-flex">
                  {propriete.icon?.name && (
                    <Icon
                      className="flex-shrink-0"
                      icon={`${propriete.icon.provider}:${propriete.icon.name}`}
                      width={40}
                    />
                  )}
                  <div className="ps-2 flex-grow-1 text-truncate">
                    <p className="text-truncate">{propriete.title}</p>
                    <p className="text-truncate">{propriete.subtitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container">
        <div className="row">
          {projet.gallery.map((image) => {
            return (
              <div className="col-sm-6">
                <Image
                  key={image._key}
                  src={urlFor(image.asset).width(1000).url()}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  alt={image.alt}
                  title={image.alt}
                  className="card-img-top"
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: projet?.title,
    openGraph: {
      images: [projetImageUrl],
    },
  };
}
