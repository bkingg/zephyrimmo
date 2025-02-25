import urlFor from "@/lib/urlFor";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

const CustomImageComponent = ({ value }: any) => {
  console.log("value", value);
  return (
    <div className="mb-4">
      <Image
        src={urlFor(value.asset).width(800).url()}
        width={800}
        height={0}
        alt={value.alt || "Image"}
        className="img-fluid rounded"
      />
    </div>
  );
};

const components = {
  types: {
    image: CustomImageComponent,
  },
};
interface CustomPortableTextProps {
  content: any; // You can refine this type further based on your schema
}

export default function CustomPortableText({
  content,
}: CustomPortableTextProps) {
  return <PortableText value={content} components={components} />;
}
