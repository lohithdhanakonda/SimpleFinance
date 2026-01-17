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
    <>
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
      {/* SEO Content Section */}
      <section className="mt-12 max-w-5xl mx-auto space-y-6 text-sm text-gray-700">
        <h1 className="text-xl font-semibold text-gray-900">
          Bharath Financial – Simple Indian Financial Calculators
        </h1>

        <p>
          Bharath Financial provides free, easy-to-use Indian financial
          calculators to help individuals plan savings, investments, loans, and
          long-term goals. These calculators are designed for Indian users
          looking to understand returns, maturity values, EMIs, and systematic
          investment planning.
        </p>

        <p>
          The platform includes calculators for common financial products such
          as Recurring Deposits (RD), Fixed Deposits (FD), Systematic Investment
          Plans (SIP), Public Provident Fund (PPF), loan EMIs, CAGR, gratuity,
          and systematic withdrawal planning.
        </p>

        <h2 className="text-lg font-semibold text-gray-900">
          Financial calculators available
        </h2>

        <ul className="list-disc pl-5 space-y-1">
          <li>
            <Link
              href="/calculators/rd-calculator"
              className="text-blue-600 hover:underline"
            >
              Recurring Deposit Calculator
            </Link>{" "}
            – calculate monthly savings and maturity value.
          </li>
          <li>
            <Link
              href="/calculators/fd-calculator"
              className="text-blue-600 hover:underline"
            >
              Fixed Deposit Calculator
            </Link>{" "}
            – estimate FD returns across banks and tenures.
          </li>
          <li>
            <Link
              href="/calculators/sip-calculator"
              className="text-blue-600 hover:underline"
            >
              SIP & Step-Up SIP Calculator
            </Link>{" "}
            – plan long-term mutual fund investments.
          </li>
          <li>
            <Link
              href="/calculators/emi-calculator"
              className="text-blue-600 hover:underline"
            >
              EMI Calculator
            </Link>{" "}
            – calculate loan EMIs and total interest.
          </li>
          <li>
            <Link
              href="/calculators/ppf-calculator"
              className="text-blue-600 hover:underline"
            >
              PPF Calculator
            </Link>{" "}
            – estimate maturity amount for Public Provident Fund.
          </li>
          <li>
            <Link
              href="/calculators/cagr-calculator"
              className="text-blue-600 hover:underline"
            >
              CAGR Calculator
            </Link>{" "}
            – calculate annualized investment returns.
          </li>
          <li>
            <Link
              href="/calculators/gratuity-calculator"
              className="text-blue-600 hover:underline"
            >
              Gratuity Calculator
            </Link>{" "}
            – estimate gratuity payable based on salary and service.
          </li>
          <li>
            <Link
              href="/calculators/swp-calculator"
              className="text-blue-600 hover:underline"
            >
              SWP Calculator
            </Link>{" "}
            – plan systematic withdrawals from investments.
          </li>
        </ul>

        <h2 className="text-lg font-semibold text-gray-900">
          Why use Bharath Financial?
        </h2>

        <p>
          All calculators are built specifically for Indian financial products
          and assumptions. The results are indicative and meant for planning and
          comparison purposes. Users can adjust interest rates, tenure, and
          contribution values based on their own expectations.
        </p>

        <p>
          Bharath Financial does not require login or personal data and focuses
          on providing transparent calculations with simple explanations.
        </p>
      </section>
    </>
  );
}
