import { sanityFetch } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import Link from "next/link";
import Navigation from "./Navigation";

export default async function Header() {
  return (
    <>
      <Navigation />
    </>
  );
}
