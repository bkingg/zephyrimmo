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
        backgroundColor: "rgba(0,153,153, 1)",
        backgroundImage: image
          ? `linear-gradient(to top, rgba(0,153,153, 0.7), rgba(0,153,153, 1) 95%), url(${image})`
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
