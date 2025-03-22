import urlFor from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";
import CustomPortableText from "../CustomPortableText";

interface VideoSectionProps {
  section: any;
}

export default function VideoSection({ section }: VideoSectionProps) {
  const getYouTubeID = (url: string) => {
    const regExp =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url?.match(regExp);
    return match ? match[1] : null;
  };
  return (
    <section className="section section-animate section__video">
      <div className="text-center">
        {section.title && <h2>{section.title}</h2>}
        {section.description && <p>{section.description}</p>}

        {section.url && (
          <iframe
            width="100%"
            height="800"
            src={`https://www.youtube.com/embed/${getYouTubeID(section.url)}?modestbranding=1&fs=0&controls=0&rel=0&autoplay=1&color=white&enablejsapi=1`}
            title={section.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </section>
  );
}
