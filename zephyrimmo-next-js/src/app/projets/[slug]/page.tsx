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
import React from "react";
import Slider from "react-slick";
import GallerySlider from "@/components/GallerySlider";

interface Propriete {
  _key: string;
  title: string;
  subtitle: string;
  icon: {
    name: string;
    provider: string;
  };
}

interface ImageObject {
  _key: string;
  asset: string;
  alt: string;
}

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
      <div className="container section">
        <div className="row row-cols-2 row-cols-md-3 row-cols-md-5 justify-content-center">
          {projet.proprietes.map((propriete: Propriete) => {
            return (
              <div key={propriete._key} className="col">
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

      <div className="section">
        <GallerySlider
          gallery={projet.gallery.map((image: ImageObject) => {
            image.asset = `${urlFor(image.asset).size(500, 700).fit("crop").url()}`;
            return image;
          })}
        />
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
