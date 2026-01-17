"use client";

import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import InternalCalculatorLinks from "@/app/components/InternalCalculatorLinks";
import Breadcrumbs from "@/app/components/Breadcrumbs";

/* ---------- Helpers ---------- */

function formatCurrency(value: number) {
  return value.toLocaleString("en-IN");
}

function parseNumber(value: string) {
  return Number(value.replace(/,/g, ""));
}

/* ---------- SIP Calculation ---------- */

function calculateSIP({
  monthlyAmount,
  years,
  annualRate,
  stepUpEnabled,
  stepUpType,
  stepUpValue,
  stepUpFrequency,
}: {
  monthlyAmount: number;
  years: number;
  annualRate: number;
  stepUpEnabled: boolean;
  stepUpType: "percent" | "amount";
  stepUpValue: number;
  stepUpFrequency: "monthly" | "quarterly" | "half-yearly" | "yearly";
}) {
  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;

  let totalInvestment = 0;
  let corpus = 0;
  let sipAmount = monthlyAmount;

  const frequencyMap: Record<string, number> = {
    monthly: 1,
    quarterly: 3,
    "half-yearly": 6,
    yearly: 12,
  };

  const stepUpInterval = frequencyMap[stepUpFrequency];

  for (let m = 1; m <= months; m++) {
    corpus = corpus * (1 + monthlyRate) + sipAmount;
    totalInvestment += sipAmount;

    if (stepUpEnabled && m % stepUpInterval === 0) {
      sipAmount +=
        stepUpType === "percent"
          ? (sipAmount * stepUpValue) / 100
          : stepUpValue;
    }
  }

  return {
    totalInvestment,
    corpus,
    returns: corpus - totalInvestment,
  };
}

/* ---------- Component ---------- */

export default function SIPCalculatorClient() {
  const [monthlyInput, setMonthlyInput] = useState("10,000");
  const [years, setYears] = useState(15);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const [stepUpEnabled, setStepUpEnabled] = useState(false);
  const [stepUpType, setStepUpType] = useState<"percent" | "amount">("percent");
  const [stepUpValue, setStepUpValue] = useState(10);
  const [stepUpFrequency, setStepUpFrequency] = useState<
    "monthly" | "quarterly" | "half-yearly" | "yearly"
  >("yearly");

  const monthlyAmount = parseNumber(monthlyInput);

  const result = calculateSIP({
    monthlyAmount,
    years,
    annualRate: expectedReturn,
    stepUpEnabled,
    stepUpType,
    stepUpValue,
    stepUpFrequency,
  });

  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 py-6 space-y-6 bg-white border rounded-lg">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "SIP Calculator" },
        ]}
      />
      {/* PAGE H1 */}
      <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
        SIP & Step-Up SIP Calculator
      </h1>

      {/* Monthly SIP */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Monthly SIP Amount (₹)
        </label>
        <input
          value={monthlyInput}
          onChange={(e) => {
            const raw = parseNumber(e.target.value);
            if (!isNaN(raw)) setMonthlyInput(formatCurrency(raw));
          }}
          className="border rounded-md p-2 sm:p-3 w-full text-sm sm:text-base"
        />
      </div>

      {/* Investment Duration */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Investment Duration: {years} years
        </label>
        <Slider
          min={1}
          max={40}
          value={years}
          onChange={(v) => setYears(v as number)}
        />
      </div>

      {/* Expected Returns */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Expected Annual Returns (%): {expectedReturn}%
        </label>
        <Slider
          min={1}
          max={20}
          step={0.5}
          value={expectedReturn}
          onChange={(v) => setExpectedReturn(v as number)}
        />
      </div>

      {/* Step-Up Toggle */}
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={stepUpEnabled}
          onChange={() => setStepUpEnabled(!stepUpEnabled)}
        />
        Enable Step-Up SIP
      </label>

      {/* Step-Up Options */}
      {stepUpEnabled && (
        <div className="space-y-4 border rounded-md bg-gray-50 p-4">
          {/* Type */}
          <div className="flex flex-wrap gap-4 text-sm">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                checked={stepUpType === "percent"}
                onChange={() => setStepUpType("percent")}
              />
              Percentage (%)
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                checked={stepUpType === "amount"}
                onChange={() => setStepUpType("amount")}
              />
              Fixed Amount (₹)
            </label>
          </div>

          {/* Value */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Step-Up Value {stepUpType === "percent" ? "(%)" : "(₹)"}
            </label>
            <Slider
              min={stepUpType === "percent" ? 1 : 500}
              max={stepUpType === "percent" ? 30 : 10000}
              step={stepUpType === "percent" ? 1 : 500}
              value={stepUpValue}
              onChange={(v) => setStepUpValue(v as number)}
            />
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Step-Up Frequency
            </label>
            <select
              value={stepUpFrequency}
              onChange={(e) => setStepUpFrequency(e.target.value as any)}
              className="border rounded-md p-2 sm:p-3 w-full text-sm sm:text-base"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="half-yearly">Half-Yearly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="border-t pt-4 space-y-1 text-sm">
        <p>
          <strong>Total Investment:</strong> ₹
          {formatCurrency(Math.round(result.totalInvestment))}
        </p>
        <p>
          <strong>Estimated Returns:</strong> ₹
          {formatCurrency(Math.round(result.returns))}
        </p>
        <p>
          <strong>Final Corpus:</strong> ₹
          {formatCurrency(Math.round(result.corpus))}
        </p>
      </div>

      {/* Info box */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">
          About SIP and Step-Up SIP
        </h2>

        <p>
          A Systematic Investment Plan (SIP) helps investors build wealth by
          investing a fixed amount regularly and benefiting from long-term
          compounding.
        </p>

        <p>
          Step-Up SIP increases the investment amount periodically, usually in
          line with income growth, significantly improving long-term wealth
          creation.
        </p>

        <p>
          Returns shown are indicative and based on assumed constant returns.
          Actual mutual fund performance may vary due to market conditions.
        </p>
      </div>
      <InternalCalculatorLinks
        links={[
          { href: "/calculators/swp-calculator", label: "SWP Calculator" },
          { href: "/calculators/cagr-calculator", label: "CAGR Calculator" },
          {
            href: "/calculators/rd-calculator",
            label: "Recurring Deposit Calculator",
          },
        ]}
      />
    </div>
  );
}
