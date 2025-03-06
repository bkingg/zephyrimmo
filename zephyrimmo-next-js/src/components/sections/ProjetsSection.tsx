import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import ProjetCard from "../ProjetCard";
import Link from "next/link";
import urlFor from "@/lib/urlFor";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface ProjetsSectionProps {
  section: any;
}

interface Projet {
  _id: string;
  title: string;
  slug: { current: string };
  image: string;
  imageUrl: string;
}

export default async function ProjetsSection({ section }: ProjetsSectionProps) {
  const projets = section.projets;
  return (
    <section className="section section__actualites">
      <div className="container">
        {section.title && (
          <h1 className={`${playfairDisplay.className} text-center`}>
            {section.title}
          </h1>
        )}
        {section.description && (
          <p className="text-center">{section.description}</p>
        )}
        <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 pt-4 d-flex justify-content-center">
          {projets.map((projet: Projet) => {
            projet.imageUrl = projet.image
              ? urlFor(projet.image).size(500, 500).fit("crop").url()
              : "";
            return <ProjetCard key={projet._id} projet={projet} />;
          })}
        </div>
        <div className="text-center my-2">
          <Link href="/projets" className="btn btn-primary">
            Voir tous les Projets
          </Link>
        </div>
      </div>
    </section>
  );
}
