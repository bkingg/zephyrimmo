import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument, SanityImageAssetDocument } from "next-sanity";
import { PortableText } from "@portabletext/react";
import urlFor from "@/lib/urlFor";
import PageHeader from "@/components/PageHeader";
import { notFound } from "next/navigation";
import { ResolvingMetadata, Metadata } from "next";
import Image from "next/image";
import { Icon } from "@iconify/react";
import React from "react";
import Slider from "react-slick";
import GallerySlider from "@/components/GallerySlider";
import ProjetPlans from "@/components/ProjetPlans";
import Link from "next/link";
import DirectionsLink from "@/components/DirectionsLink";
import ProjetInquiryForm from "@/components/ProjetInquiryForm";

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

interface PlanObject {
  _key: string;
  title: string;
  image: SanityImageAssetDocument;
}

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
      },
      address,
      map,
      plans[]{
        _key,
        title,
        image
      },
      brochure,
      "brochureUrl": brochure.asset->url
    }`;
  projet = await sanityFetch<SanityDocument>({
    query: PROJET_QUERY,
  });

  if (!projet) notFound();

  projetImageUrl = urlFor(projet?.image).width(1000).url();

  return (
    <div className="projet">
      <div className="section container">
        <div className="row align-items-end">
          <div className="col-sm-6">
            <p className="projet__ville">{projet.ville}</p>
            <h1 className="projet__title text-start">{projet.title}</h1>
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
                    <p className="projet__property text-truncate">
                      <span className="projet__property__title">
                        {propriete.title}
                      </span>
                      <br />
                      <span className="projet__property__subtitle">
                        {propriete.subtitle}
                      </span>
                    </p>
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
            image.asset = `${urlFor(image.asset).size(1000, 1400).fit("crop").url()}`;
            return image;
          })}
        />
      </div>

      <div className="section container projet__map">
        <div className="row align-items-center">
          <div className="col-md-5">
            {projet.map && (
              <iframe
                className="projet__map"
                src={projet.map}
                width="100%"
                height="600"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            )}
          </div>
          <div className="col-md-7 projet__address">
            <p className="projet__ville">{projet.ville}</p>
            <h2>
              <PortableText value={projet.address} />
            </h2>
            <DirectionsLink className="btn btn-primary" embedUrl={projet.map} />
          </div>
        </div>
      </div>

      <div className="section container projet__plans">
        <ProjetPlans
          plans={projet.plans?.map((plan: PlanObject) => {
            const image = plan.image;
            plan.image.asset = `${urlFor(image.asset).width(800).url()}`;
            return plan;
          })}
        />
      </div>

      {projet.brochure && (
        <div className="section container text-center">
          <div className="d-flex justify-content-center">
            <div className="projet__brochure">
              <Link href={projet.brochureUrl + "?dl"}>
                <i className="bi bi-file-earmark-pdf"></i>
                <p>BROCHURE</p>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="section container projet__form">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-6">
            <p className="subtitle text-center">Renseignements</p>
            <h2 className="text-center mb-3">
              Si vous avez des questions, nous serons heureux de vous répondre
              dans les plus brefs délais.
            </h2>
            <ProjetInquiryForm projet={projet} />
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
  return {
    title: projet?.title,
    openGraph: {
      images: [projetImageUrl],
    },
  };
}
