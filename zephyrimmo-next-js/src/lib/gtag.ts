export const GA_TRACKING_ID = "G-ZXFR3J5YWZ"; // Your GA4 ID

type Gtag = (
  command: "config" | "event" | "set" | "js",
  ...args: unknown[]
) => void;

export const pageview = (url: string): void => {
  if (typeof window === "undefined") return;

  const gtag = (window as Window & { gtag?: Gtag }).gtag;
  if (!gtag) return;

  gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};
