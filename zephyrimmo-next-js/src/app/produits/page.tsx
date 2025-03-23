import {
  Container,
  Row,
  Col,
  ListGroup,
  Breadcrumb,
  BreadcrumbItem,
} from "react-bootstrap";
import Link from "next/link";
import { groq, SanityDocument, SanityImageAssetDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
import PageHeader from "@/components/PageHeader";
import urlFor from "@/lib/urlFor";
import ProductCard from "@/components/ProductCard";

const SITE_SETTINGS_QUERY = groq`*[
      _type == "siteSettings"
    ][0]{
      projetsPageImage,
    }`;

const PRODUCTS_QUERY = groq`
      *[_type == "product"] {
        _id,
        _rev,
        title,
        slug,
        price,
        images
      }
    `;

export default async function ProductsPage() {
  const siteSettings = await sanityFetch<SanityDocument>({
    query: SITE_SETTINGS_QUERY,
  });

  const productsPageImageUrl = siteSettings?.productsPageImage
    ? urlFor(siteSettings?.productsPageImage)
        .size(1000, 1000)
        .crop("center")
        .url()
    : "";

  const products = await sanityFetch<SanityDocument[]>({
    query: PRODUCTS_QUERY,
  });

  return (
    <>
      <PageHeader image={productsPageImageUrl}>
        <h1 className="page__title">Produits</h1>

        <Breadcrumb className="page__header__breadcrumb">
          <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
          <BreadcrumbItem active>Produits</BreadcrumbItem>
        </Breadcrumb>
      </PageHeader>
      <div className="section section-animate container">
        <div className="row row-cols-1 row-cols-md-3">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
