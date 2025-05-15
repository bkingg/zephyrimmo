import { client } from "@/sanity/client";
import imgUrlBuilder from "@sanity/image-url";

const builder = imgUrlBuilder(client);

export default function urlFor(source: any) {
  return builder.image(source);
}
