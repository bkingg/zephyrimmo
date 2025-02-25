import { SanityDocument } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface ServiceCardProps {
  service: Service | SanityDocument;
}

interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  imageUrl: string;
  niveau?: string;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <>
      <Link
        href={`/services/${service.slug.current}`}
        className="service col mb-5"
      >
        <div className="card h-100">
          <Image
            src={service.imageUrl ? service.imageUrl : "/placeholder.svg"}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt={service.title}
            title={service.title}
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className={`${playfairDisplay.className} card-title`}>{service.title}</h5>
            {/* <p className="card-text">
                      lorem ipsum dolor sit amet
                    </p> */}
            <button className="btn btn-light">
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </Link>
    </>
  );
}
