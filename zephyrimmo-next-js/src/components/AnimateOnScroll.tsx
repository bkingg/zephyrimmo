"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const AnimateOnScroll = () => {
  const pathname = usePathname(); // Detects when the route changes

  useEffect(() => {
    const sections = document.querySelectorAll(".section");

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              entry.target.classList.add("visible");
            });
            observer.unobserve(entry.target); // Stop observing once visible
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]); // Re-run when the route changes

  return null;
};

export default AnimateOnScroll;
