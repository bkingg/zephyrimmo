import urlFor from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";

interface CallToActionSectionProps {
  section: any;
}

export default function CallToActionSection({
  section,
}: CallToActionSectionProps) {
  return (
    <section
      style={{
        backgroundColor: "rgba(56, 64, 116, 1)",
        backgroundImage: urlFor(section.image).width(700).url()
          ? `linear-gradient(to top, rgba(56, 64, 116, 0.7), rgba(56, 64, 116, 1) 95%), url(${urlFor(section.image).width(700).url()})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="section text-center bg-primary text-light section__cta my-0"
    >
      <div className="container">
        {section.title && <h1 className="vidaloka">{section.title}</h1>}
        {section.description && <p>{section.description}</p>}
        {section.ctaText &&
          ((section.ctaUrl && (
            <Link className="btn btn-secondary" href={section.ctaUrl}>
              {section.ctaText}
            </Link>
          )) ||
            (section.brochure && (
              <a
                className="btn btn-secondary"
                href={section.brochureUrl + "?dl"}
                download
              >
                {section.ctaText}
                <i className="bi bi-download ps-2"></i>
              </a>
            )))}
      </div>
    </section>
  );
}
