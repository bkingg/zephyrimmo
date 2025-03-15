"use client";

import urlFor from "@/lib/urlFor";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  NavbarBrand,
  NavLink,
  NavbarCollapse,
  NavbarToggle,
  DropdownItem,
  DropdownDivider,
} from "react-bootstrap";

interface NavigationProps {
  siteSettings: any;
}

interface MenuItem {
  _key: string;
  title: string;
  linkType: string;
  internalLink: {
    _type: string;
    slug: { current: string };
  };
  externalUrl: string;
  submenuItems: MenuItem[];
}

export default function Navigation({ siteSettings }: NavigationProps) {
  const menu = siteSettings.mainMenu;

  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const updateHeaderAndNextSibling = () => {
    if (!headerRef.current) return;

    const nextElement = headerRef.current
      .nextElementSibling as HTMLElement | null;
    const height = headerRef.current.offsetHeight;

    if (nextElement) nextElement.style.marginTop = `${height}px`;

    setIsSticky(window.scrollY > height);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateHeaderAndNextSibling);
    window.addEventListener("resize", updateHeaderAndNextSibling);

    updateHeaderAndNextSibling(); // Run on mount

    return () => {
      window.removeEventListener("scroll", updateHeaderAndNextSibling);
      window.removeEventListener("resize", updateHeaderAndNextSibling);
    };
  }, []);

  const menuShow = (items: MenuItem[]) => {
    return items.map((item: MenuItem) => {
      if (item.submenuItems) {
        return (
          <NavDropdown
            title={item.title}
            key={item._key}
            renderMenuOnMount={true}
          >
            {menuShow(item.submenuItems)}
          </NavDropdown>
        );
      } else {
        return (
          <NavLink
            key={item._key}
            href={
              item.linkType === "internal"
                ? `/${item.internalLink?._type}s/${item.internalLink?.slug.current}`
                : item.externalUrl
            }
          >
            <span>{item.title}</span>
          </NavLink>
        );
      }
    });
  };
  return (
    <Navbar
      ref={headerRef}
      expand="md"
      className={`header ${isSticky ? "sticky" : ""}`}
    >
      <Container>
        <NavbarBrand href="/">
          <div className="header__logo-wrapper">
            <Image
              src={siteSettings.logoUrl}
              fill
              alt="Hepo Dakar"
              title="Hepo Dakar"
              className="img-fluid logo"
              style={{
                objectFit: "contain",
                objectPosition: "left",
              }}
            />
          </div>
        </NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="m-auto">{menuShow(menu.items)}</Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}
