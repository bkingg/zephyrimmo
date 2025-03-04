import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import urlFor from "@/lib/urlFor";
import { sanityFetch } from "@/sanity/client";
import { Metadata } from "next";
import { groq, PortableText, SanityDocument } from "next-sanity";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Contact",
  description: "Page de Contact",
};

export default async function Contact() {
  const SITE_SETTINGS_QUERY = groq`*[
    _type == "siteSettings"
  ][0]{
    contactPageTitle,
    contactPageImage,
    showMap,
    contactPageSubTitle,
    contactPageDescription,
    phone,
    address,
    email,
  }`;

  const siteSettings = await sanityFetch<SanityDocument>({
    query: SITE_SETTINGS_QUERY,
  });

  const contactPageImageUrl = siteSettings?.contactPageImage
    ? urlFor(siteSettings?.contactPageImage)
        .size(1000, 1000)
        .crop("center")
        .url()
    : "";
  return (
    <>
      <PageHeader image={contactPageImageUrl}>
        <h1 className={`page__title ${playfairDisplay.className}`}>
          {siteSettings.contactPageTitle}
        </h1>
      </PageHeader>
      <div className="section container">
        {siteSettings.showMap && (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15434.825079595117!2d-17.4611552!3d14.7291915!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec10d1e41cbc6b5%3A0xa3eb1f5c16eb8af5!2sHepo%20Dakar!5e0!3m2!1sen!2ssn!4v1723955655123!5m2!1sen!2ssn"
            width="100%"
            height="400"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        )}
      </div>
      <div className="section container">
        <div className="row">
          <div className="">
            {siteSettings.contactPageSubTitle && (
              <h1 className="text-start">{siteSettings.contactPageSubTitle}</h1>
            )}
            {siteSettings.contactPageDescription && (
              <p className="text-start">
                {siteSettings.contactPageDescription}
              </p>
            )}
            <div className="text-center">
              <div className="card-block px-2">
                <div className={`${playfairDisplay.className}`}>
                  <PortableText value={siteSettings.address} />
                </div>
              </div>
              <div className="card-block px-2">
                <div className="card-text">
                  <PortableText value={siteSettings.phone} />
                </div>
              </div>
              <div className="card-block px-2">
                <div className="card-text">
                  <PortableText value={siteSettings.email} />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="contact__form">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
