"use client";

import { SanityImageAssetDocument } from "next-sanity";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Tabs, Tab } from "react-bootstrap";
import Slider from "react-slick";

interface ProjetPlansProps {
  plans: PlanObject[];
}

interface PlanObject {
  _key: string;
  title: string;
  image: SanityImageAssetDocument;
}

export default function ProjetPlans({ plans }: ProjetPlansProps) {
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite scroll
    speed: 500, // Transition speed
    arrows: false,
    slidesToShow: 3, // Number of items per slide
    slidesToScroll: 1, // Number of items to scroll per action
    autoplay: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 768, // For smaller screens
        settings: {
          slidesToShow: 2, // 2 items on smaller screens
        },
      },
      {
        breakpoint: 480, // For very small screens
        settings: {
          slidesToShow: 1, // 1 item on small screens
        },
      },
    ],
  };
  console.log("plans", plans);
  return (
    <>
      <Tabs
        defaultActiveKey={plans?.[0]._key}
        transition={false}
        id="projet-plans"
        justify
        className="nav justify-content-center"
      >
        {plans?.map((plan: PlanObject) => {
          console.log("plan", plan);
          const image = plan.image;
          return (
            <Tab
              className="projet__plans__tab-content"
              eventKey={plan._key}
              title={plan.title}
            >
              <Image
                key={image._key}
                src={image.asset}
                fill
                alt={plan.title}
                title={plan.title}
                className="p-2"
                style={{
                  objectFit: "contain",
                  objectPosition: "left",
                }}
              />
            </Tab>
          );
        })}
      </Tabs>
    </>
  );
}
