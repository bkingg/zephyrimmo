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
import Link from "next/link";
import DirectionsLink from "@/components/DirectionsLink";
import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";

let service: SanityDocument;
let serviceImageUrl: string;

export default async function Service({
  params,
}: {
  params: { slug: string };
}) {
  console.log("params", params);

  const SERVICE_QUERY = groq`
    *[
      _type == "service"
      && defined(slug.current)
      && slug.current == "${params.slug}"
    ][0]{
      _id, 
      title, 
      image, 
      slug, 
      description
    }`;
  service = await sanityFetch<SanityDocument>({
    query: SERVICE_QUERY,
  });

  if (!service) notFound();

  serviceImageUrl = urlFor(service?.image).width(1000).url();

  return (
    <>
      <PageHeader image={serviceImageUrl}>
        <h1 className="page__title">{service.title}</h1>

        <Breadcrumb className="page__header__breadcrumb">
          <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
          <BreadcrumbItem href="/services" active>
            Services
          </BreadcrumbItem>
          <BreadcrumbItem href={`/services/${service.slug}`} active>
            {service.title}
          </BreadcrumbItem>
        </Breadcrumb>
      </PageHeader>
      <div className="service">
        <div className="section container">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consectetur, nostrum nisi optio ut quidem error excepturi aliquid
            quia, vero, voluptas suscipit repellat beatae quas deleniti impedit.
            Expedita ex a ea.
          </p>
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
    title: service?.title,
    openGraph: {
      images: [serviceImageUrl],
    },
  };
}
