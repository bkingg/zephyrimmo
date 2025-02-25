// src/context/SiteSettingsContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { sanityFetch } from "@/sanity/client";
import { groq } from "next-sanity";

interface SiteSettings {
  logo: {
    asset: {
      url: string;
    };
  };
  mainMenu: string;
  facebook: string;
  twitter: string;
  instagram: string;
}

const SiteSettingsContext = createContext<SiteSettings | null>(null);

const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    logo,
    mainMenu,
    facebook,
    twitter,
    instagram
  }
`;

export const SiteSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const settings = await sanityFetch<SiteSettings>({
        query: siteSettingsQuery,
      });
      setSiteSettings(settings);
    };
    fetchData();
  }, []);

  return (
    <SiteSettingsContext.Provider value={siteSettings}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error(
      "useSiteSettings must be used within a SiteSettingsProvider"
    );
  }
  return context;
};
