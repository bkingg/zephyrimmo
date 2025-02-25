import urlFor from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";

interface LogoListSectionProps {
  section: any;
}

interface Logo {
  _key: string;
  image: object;
  url: string;
  title: string;
}

export default function LogoListSection({ section }: LogoListSectionProps) {
  return (
    <section className="section text-center">
      <div className="container">
        {section.title !== undefined && <h1>{section.title}</h1>}
        {section.description !== undefined && <p>{section.description}</p>}
        <div className="section__logo-list__logos row row-cols-2 row-cols-md-5 justify-content-center align-items-center">
          {section.logos.map((logo: Logo) => {
            return (
              <div key={logo._key} className="col">
                {logo.url !== "#" ? (
                  <Link href={logo.url} target="_blank">
                    <Image
                      src={urlFor(logo.image)
                        .size(200, 200)
                        .crop("center")
                        .url()}
                      width={150}
                      height={150}
                      alt={logo.title}
                      title={logo.title}
                      className="img-fluid"
                    />
                  </Link>
                ) : (
                  <Image
                    src={urlFor(logo.image).size(200, 200).crop("center").url()}
                    width={150}
                    height={150}
                    alt={logo.title}
                    title={logo.title}
                    className="img-fluid"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
