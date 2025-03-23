import { SanityDocument, SanityImageAssetDocument } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { Carousel, CarouselItem } from "react-bootstrap";

interface ProductCardProps {
  product: SanityDocument;
}

export default function ProductDetailsPage({ product }: ProductCardProps) {
  return (
    <div className="product">
      <div className="section container">
        <div className="row">
          <div className="col-md-6">
            {product.images && product.images.length > 0 && (
              <Carousel interval={2000} fade={true}>
                {product.images?.map(
                  (image: SanityImageAssetDocument, index: number) => (
                    <CarouselItem key={image._key}>
                      <Image
                        src={image.asset}
                        width={1000}
                        height={1000}
                        alt={`${product.title} - Image ${index + 1}`}
                        className="d-block w-100 img-fluid carousel-image"
                      />
                    </CarouselItem>
                  )
                )}
              </Carousel>
            )}
          </div>
          <div className="col-md-6">
            <div className="product-details">
              <h1 className="mb-3">{product.title}</h1>
              <div className="mb-3">
                <span className="h3 text-primary">{product.price} F CFA</span>
                {product.inStock ? (
                  <span className="badge bg-success ms-3">En Stock</span>
                ) : (
                  <span className="badge bg-danger ms-3">Rupture de Stock</span>
                )}
              </div>
              <Link
                href={`/categories/${product.category.slug}`}
                className="text-decoration-none"
              >
                <span className="badge bg-secondary mb-3">
                  {product.category.title}
                </span>
              </Link>
              <p className="lead mb-4">{product.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="section section-animate container product__form mb-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-6">
            <p className="subtitle text-center">Renseignements</p>
            <h2 className="text-center mb-3">
              Si vous avez des questions, nous serons heureux de vous répondre
              dans les plus brefs délais.
            </h2>
            <ProjetInquiryForm product={product} />
          </div>
        </div>
      </div> */}
    </div>
  );
}
