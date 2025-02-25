import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import Link from "next/link";
import urlFor from "@/lib/urlFor";
import Image from "next/image";
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

const MENU_ITEM_FRAGMENT = groq`
  _key,
  title,
  linkType,
  internalLink->{_id, _type, title, slug, image},
  externalUrl,
  submenuItems[]`;

const SITE_SETTINGS_QUERY = groq`*[
  _type == "siteSettings"
][0]{
  logo,
  mainMenu->{
    _id, 
    title, 
    handle,
    items[]{
      ${MENU_ITEM_FRAGMENT}{
        ${MENU_ITEM_FRAGMENT}{
          ${MENU_ITEM_FRAGMENT}
        }
      }
    }
  },
}`;

export default async function Navigation() {
  const siteSettings = await sanityFetch<SanityDocument>({
    query: SITE_SETTINGS_QUERY,
  });

  const menu = siteSettings.mainMenu;

  console.log(siteSettings);

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
    <Navbar expand="sm" fixed="top" className="header" variant="dark">
      <Container>
        <NavbarBrand href="/">
          <Image
            src={urlFor(siteSettings.logo).url()}
            width={200}
            height={60}
            alt="Hepo Dakar"
            title="Hepo Dakar"
            className="img-fluid logo"
          />
        </NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="m-auto">{menuShow(menu.items)}</Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}
