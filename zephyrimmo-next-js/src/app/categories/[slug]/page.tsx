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

export default async function Category({
  params,
}: {
  params: { slug: string };
}) {
  const CATEGORY_QUERY = groq`
        *[
            _type == "category"
            && defined(slug.current)
            && slug.current == "${params.slug}"
        ][0]{
          _id,
          title,
          slug,
          image
        }
      `;
  const PRODUCTS_QUERY = groq`
        *[
            _type == "product"
            && category->slug.current == "${params.slug}"
        ]{
          _id,
          category->{slug},
          title,
          slug,
          price,
          images
        }
      `;

  const category = await sanityFetch<SanityDocument>({
    query: CATEGORY_QUERY,
  });

  const categoryImageUrl = urlFor(category?.image).width(1000).url();

  const products = await sanityFetch<SanityDocument[]>({
    query: PRODUCTS_QUERY,
  });

  return (
    <>
      <PageHeader image={categoryImageUrl}>
        <h1 className="page__title">{category.title}</h1>

        <Breadcrumb className="page__header__breadcrumb">
          <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
          <BreadcrumbItem href="/categories">Categories</BreadcrumbItem>
          <BreadcrumbItem active>{category.title}</BreadcrumbItem>
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
