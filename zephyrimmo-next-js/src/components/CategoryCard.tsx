import { SanityDocument } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import urlFor from "@/lib/urlFor";

interface CategoryCardProps {
  category: Category | SanityDocument;
}

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  image: string;
  imageUrl: string;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  category.imageUrl = category.image
    ? urlFor(category.image).size(500, 500).fit("crop").url()
    : "";
  return (
    <>
      <Link
        href={`/categories/${category.slug.current}`}
        className="category col mb-5"
      >
        <div className="card h-100">
          <Image
            src={category.imageUrl ? category.imageUrl : "/placeholder.svg"}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt={category.title}
            title={category.title}
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="vidaloka card-title">{category.title}</h5>
            {/* <p className="card-text">
                      lorem ipsum dolor sit amet
                    </p> */}
          </div>
        </div>
      </Link>
    </>
  );
}
