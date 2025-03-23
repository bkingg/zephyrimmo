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
import CategoryCard from "@/components/CategoryCard";

const SITE_SETTINGS_QUERY = groq`*[
    _type == "siteSettings"
  ][0]{
    projetsPageImage,
  }`;

const CATEGORIES_QUERY = groq`
    *[_type == "category"] {
      _id,
      _rev,
      title,
      slug,
      image
    }
  `;

export default async function CategoriesPage() {
  const siteSettings = await sanityFetch<SanityDocument>({
    query: SITE_SETTINGS_QUERY,
  });

  const categoriesPageImageUrl = siteSettings?.categoriesPageImage
    ? urlFor(siteSettings?.categoriesPageImage)
        .size(1000, 1000)
        .crop("center")
        .url()
    : "";

  const categories = await sanityFetch<SanityDocument[]>({
    query: CATEGORIES_QUERY,
  });

  return (
    <>
      <PageHeader image={categoriesPageImageUrl}>
        <h1 className="page__title">Catégories</h1>

        <Breadcrumb className="page__header__breadcrumb">
          <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
          <BreadcrumbItem active>Catégories</BreadcrumbItem>
        </Breadcrumb>
      </PageHeader>
      <div className="section section-animate container">
        <div className="row row-cols-1 row-cols-md-3">
          {categories?.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </>
  );
}
