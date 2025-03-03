import type { Metadata } from "next";
import { headers } from "next/headers";
import { pathname } from "next-extra/pathname";
import { Montserrat } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/globals.css";
import "../../styles/custom.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"], // Add the required weights
});

export const metadata: Metadata = {
  title: {
    template: "%s | Zephyr Immo",
    default: "Zephyr Immo",
  },
  description: "Zephyr Immo est une entreprise Immobiliere",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string };
}>) {
  const pathNameString = await pathname();
  console.log("pathNameString", pathNameString);
  const pageClass = `page${pathNameString != "/" ? pathNameString.replaceAll("/", "__") : "__home"}`;
  return (
    <html lang="fr">
      <body className={`${montserrat.className} ${pageClass}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
