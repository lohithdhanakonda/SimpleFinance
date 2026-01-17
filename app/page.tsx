"use client";

import Link from "next/link";
import Image from "next/image";
import TextConstants from "./config/constants/textConstants";

import rd from "../public/assets/images/rd.png";
import fd from "../public/assets/images/fd.png";
import cagr from "../public/assets/images/cagr.png";
import gratuity from "../public/assets/images/gratuity.png";
import emi from "../public/assets/images/emi.png";
import sip from "../public/assets/images/sip.png";
import ppf from "../public/assets/images/ppf.png";
import swp from "../public/assets/images/swp.png";

export default function Home() {
  const menu = [
    {
      navigate: "/calculators/rd-calculator",
      name: "Recurring Deposit Calculator",
      icon: rd,
      id: "rd",
    },
    {
      navigate: "/calculators/fd-calculator",
      name: "Fixed Deposit Calculator",
      icon: fd,
      id: "fd",
    },
    {
      navigate: "/calculators/sip-calculator",
      name: "SIP Calculator",
      icon: sip,
      id: "sip",
    },
    {
      navigate: "/calculators/emi-calculator",
      name: "EMI Calculator",
      icon: emi,
      id: "emi",
    },
    {
      navigate: "/calculators/ppf-calculator",
      name: "PPF Calculator",
      icon: ppf,
      id: "ppf",
    },
    {
      navigate: "/calculators/cagr-calculator",
      name: "CAGR Calculator",
      icon: cagr,
      id: "cagr",
    },
    {
      navigate: "/calculators/gratuity-calculator",
      name: "Gratuity Calculator",
      icon: gratuity,
      id: "gratuity",
    },
    {
      navigate: "/calculators/swp-calculator",
      name: "SWP Calculator",
      icon: swp,
      id: "swp",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {menu.map((menuItem) => (
        <Link key={menuItem.name} href={menuItem.navigate}>
          <div
            className=" individual-menu card
          p-6 gap-4
          flex flex-col items-center justify-center
          group
          transition
          duration-300
          hover:shadow-lg
          hover:-translate-y-1"
          >
            <Image
              id={menuItem.id}
              src={menuItem.icon}
              alt={menuItem.name}
              width={180}
              height={180}
              className="cursor-pointer
              transition-transform
              duration-300
              ease-out
              group-hover:scale-105"
            />
            <p className="mt-3 text-center text-sm font-medium">
              {menuItem.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
