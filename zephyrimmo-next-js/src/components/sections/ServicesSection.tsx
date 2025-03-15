import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import ServiceCard from "../ServiceCard";
import Link from "next/link";
import urlFor from "@/lib/urlFor";

interface ServicesSectionProps {
  section: any;
}

interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  image: string;
  imageUrl: string;
}

export default async function ServicesSection({
  section,
}: ServicesSectionProps) {
  const services = section.services;
  return (
    <section className="section section-animate section__actualites">
      <div className="container">
        {section.title && (
          <h1 className="vidaloka text-center">{section.title}</h1>
        )}
        {section.description && (
          <p className="text-center">{section.description}</p>
        )}
        <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 pt-4 d-flex justify-content-center">
          {services.map((service: Service) => {
            service.imageUrl = service.image
              ? urlFor(service.image).size(500, 500).fit("crop").url()
              : "";
            return <ServiceCard key={service._id} service={service} />;
          })}
        </div>
        <div className="text-center my-2">
          <Link href="/services" className="btn btn-primary">
            Voir tous les Services
          </Link>
        </div>
      </div>
    </section>
  );
}
