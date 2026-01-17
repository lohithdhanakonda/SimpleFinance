"use client";

import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

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

    if (
      stepUpEnabled &&
      m % stepUpInterval === 0
    ) {
      if (stepUpType === "percent") {
        sipAmount += (sipAmount * stepUpValue) / 100;
      } else {
        sipAmount += stepUpValue;
      }
    }
  }

  return {
    totalInvestment,
    corpus,
    returns: corpus - totalInvestment,
  };
}

/* ---------- Component ---------- */

export default function SIPCalculator() {
  const [monthlyInput, setMonthlyInput] = useState("10,000");
  const [years, setYears] = useState(15);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const [stepUpEnabled, setStepUpEnabled] = useState(false);
  const [stepUpType, setStepUpType] =
    useState<"percent" | "amount">("percent");
  const [stepUpValue, setStepUpValue] = useState(10);
  const [stepUpFrequency, setStepUpFrequency] =
    useState<"monthly" | "quarterly" | "half-yearly" | "yearly">("yearly");

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
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white border rounded-lg">

      {/* Monthly SIP */}
      <div>
        <label className="block font-medium">Monthly SIP Amount (₹)</label>
        <input
          value={monthlyInput}
          onChange={(e) => {
            const raw = parseNumber(e.target.value);
            if (!isNaN(raw)) setMonthlyInput(formatCurrency(raw));
          }}
          className="border p-2 w-full"
        />
      </div>

      {/* Investment Duration */}
      <div>
        <label className="block font-medium">
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
        <label className="block font-medium">
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
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={stepUpEnabled}
          onChange={() => setStepUpEnabled(!stepUpEnabled)}
        />
        Enable Step-Up SIP
      </label>

      {/* Step-Up Options */}
      {stepUpEnabled && (
        <div className="space-y-4 border p-4 rounded-md bg-gray-50">

          {/* Step-Up Type */}
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                checked={stepUpType === "percent"}
                onChange={() => setStepUpType("percent")}
              />{" "}
              Percentage (%)
            </label>
            <label>
              <input
                type="radio"
                checked={stepUpType === "amount"}
                onChange={() => setStepUpType("amount")}
              />{" "}
              Fixed Amount (₹)
            </label>
          </div>

          {/* Step-Up Value */}
          <div>
            <label className="block font-medium">
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

          {/* Step-Up Frequency */}
          <div>
            <label className="block font-medium">Step-Up Frequency</label>
            <select
              value={stepUpFrequency}
              onChange={(e) =>
                setStepUpFrequency(e.target.value as any)
              }
              className="border p-2 w-full"
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

    </div>
  );
}
