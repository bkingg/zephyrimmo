import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";

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
  description:
    "Zephyr Immo est une entreprise Immobiliere",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={montserrat.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
