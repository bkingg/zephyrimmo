import { SanityDocument, SanityImageAssetDocument } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import urlFor from "@/lib/urlFor";

interface ProductCardProps {
  product: Product | SanityDocument;
}

interface Product {
  _id: string;
  title: string;
  price: string;
  slug: { current: string };
  images: SanityImageAssetDocument[];
  featuredImageUrl: string;
}

export default function ProductCard({ product }: ProductCardProps) {
  product.featuredImageUrl = product.images[0]
    ? urlFor(product.images[0]).size(500, 500).fit("crop").url()
    : "";
  return (
    <>
      <Link
        href={`/produits/${product.slug.current}`}
        className="product col mb-5"
      >
        <div className="card h-100">
          <Image
            src={
              product.featuredImageUrl
                ? product.featuredImageUrl
                : "/placeholder.svg"
            }
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt={product.title}
            title={product.title}
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="vidaloka card-title">{product.title}</h5>
            <p className="card-text">{product.price}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
