import { PropsWithChildren } from "react";

interface PageHeaderProps {
  image?: string;
}

export default async function PageHeader({
  image,
  children,
}: PropsWithChildren<PageHeaderProps>) {
  return (
    <div
      className="page__header"
      style={{
        backgroundColor: "rgba(56, 64, 116, 0.2)",
        backgroundImage: image
          ? `linear-gradient(to top, rgba(56, 64, 116, 0.5), rgba(56, 64, 116, 0.7) 95%), url(${image})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container">{children}</div>
    </div>
  );
}
