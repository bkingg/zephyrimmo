import urlFor from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";
import CustomPortableText from "../CustomPortableText";

interface MediaTextSectionProps {
  section: any;
}

interface QuestionReponse {
  _key: string;
  question: string;
  reponse: any;
}

export default function MediaTextSection({ section }: MediaTextSectionProps) {
  const sectionImageUrl = section.image
    ? urlFor(section.image).width(800).url()
    : "";
  return (
    <section
      style={{
        backgroundColor: section.layoutColor === "dark" ? "#2c236b" : "",
        color: section.layoutColor === "dark" ? "#fff" : "",
      }}
      className={`section section__media-text ${section.layoutColor}`}
    >
      <div className="container">
        <div
          className={`row align-items-center ${section.layout === "image_text" ? "" : "flex-row-reverse"}`}
        >
          <div className="col-sm-6">
            {section.image && (
              <Image
                src={sectionImageUrl}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "1.75rem",
                }}
                alt={section.title}
                title={section.title}
                className="img-fluid"
              />
            )}
          </div>
          <div className="col-sm-6">
            {section.title && <h3>{section.title}</h3>}
            {section.description && (
              <CustomPortableText content={section.description} />
            )}
            {section.ctaText &&
              ((section.ctaUrl && (
                <Link
                  className={`btn ${section.layoutColor === "dark" ? "btn-secondary" : "btn-primary"}`}
                  href={section.ctaUrl}
                >
                  {section.ctaText}
                </Link>
              )) ||
                (section.brochure && (
                  <a
                    className={`btn ${section.layoutColor === "dark" ? "btn-secondary" : "btn-primary"}`}
                    href={section.brochureUrl + "?dl"}
                    download
                  >
                    {section.ctaText}
                    <i className="bi bi-download ps-2"></i>
                  </a>
                )))}
          </div>
        </div>
      </div>
    </section>
  );
}
