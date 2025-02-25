import CustomPortableText from "../CustomPortableText";

interface RichTextSectionProps {
  section: any;
}

export default async function RichTextSection({
  section,
}: RichTextSectionProps) {
  return (
    <section className="section">
      <div className="container">
        <CustomPortableText content={section.richText} />
      </div>
    </section>
  );
}
