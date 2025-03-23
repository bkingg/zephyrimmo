import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument, SanityImageAssetDocument } from "next-sanity";
import urlFor from "@/lib/urlFor";
import { notFound } from "next/navigation";
import { ResolvingMetadata, Metadata } from "next";
import React from "react";
import ProductDetailsPage from "@/components/ProductDetailsPage";

let product: SanityDocument;

export default async function Projet({ params }: { params: { slug: string } }) {
  console.log("params", params);

  const PRODUCT_QUERY = groq`
    *[
      _type == "product"
      && defined(slug.current)
      && slug.current == "${params.slug}"
    ][0]{
      _id, 
      category,
      title,
      price, 
      images, 
      slug, 
      description,
      inStock
    }`;
  product = await sanityFetch<SanityDocument>({
    query: PRODUCT_QUERY,
  });

  if (!product) notFound();

  product.featuredImageUrl = urlFor(product?.images[0]).width(1000).url();
  product.images.map((image: SanityImageAssetDocument) => {
    image.asset = `${urlFor(image.asset).size(1000, 1000).fit("crop").url()}`;
    return image;
  });

  return <ProductDetailsPage product={product} />;
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: product?.title,
    openGraph: {
      images:
        product?.images?.map(
          (image: SanityImageAssetDocument) => image.asset
        ) || [],
    },
  };
}
