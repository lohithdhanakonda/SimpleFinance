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

/* ---------- SWP Calculation ---------- */
function calculateSWP({
  initialInvestment,
  monthlyWithdrawal,
  annualReturn,
  years,
}: {
  initialInvestment: number;
  monthlyWithdrawal: number;
  annualReturn: number;
  years: number;
}) {
  const months = years * 12;
  const monthlyRate = annualReturn / 100 / 12;

  let corpus = initialInvestment;
  let totalWithdrawn = 0;

  for (let i = 1; i <= months; i++) {
    corpus = corpus * (1 + monthlyRate) - monthlyWithdrawal;
    totalWithdrawn += monthlyWithdrawal;

    if (corpus <= 0) {
      corpus = 0;
      break;
    }
  }

  return {
    totalWithdrawn,
    remainingCorpus: corpus,
    netGain: totalWithdrawn + corpus - initialInvestment,
  };
}

/* ---------- Component ---------- */
export default function SWPCalculatorClient() {
  const [investmentInput, setInvestmentInput] = useState("10,00,000");
  const [withdrawalInput, setWithdrawalInput] = useState("10,000");
  const [years, setYears] = useState(20);
  const [expectedReturn, setExpectedReturn] = useState(8);

  const initialInvestment = parseNumber(investmentInput);
  const monthlyWithdrawal = parseNumber(withdrawalInput);

  const result = calculateSWP({
    initialInvestment,
    monthlyWithdrawal,
    annualReturn: expectedReturn,
    years,
  });

  return (
    <div
      className="mx-auto w-full max-w-md sm:max-w-lg lg:max-w-xl
                 bg-white border rounded-lg
                 px-4 sm:px-6 py-6 space-y-6"
    >
      {/* H1 */}
      <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
        SWP Calculator (Systematic Withdrawal Plan)
      </h1>

      {/* Initial Investment */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Initial Investment (₹)
        </label>
        <input
          value={investmentInput}
          onChange={(e) =>
            setInvestmentInput(formatCurrency(parseNumber(e.target.value)))
          }
          className="border rounded-md p-2 w-full text-sm"
        />
      </div>

      {/* Monthly Withdrawal */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Monthly Withdrawal (₹)
        </label>
        <input
          value={withdrawalInput}
          onChange={(e) =>
            setWithdrawalInput(formatCurrency(parseNumber(e.target.value)))
          }
          className="border rounded-md p-2 w-full text-sm"
        />
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Withdrawal Duration: <strong>{years} years</strong>
        </label>
        <Slider
          min={1}
          max={40}
          value={years}
          onChange={(v) => setYears(v as number)}
        />
      </div>

      {/* Expected Returns */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Expected Annual Returns (%):{" "}
          <strong>{expectedReturn}%</strong>
        </label>
        <Slider
          min={1}
          max={15}
          step={0.5}
          value={expectedReturn}
          onChange={(v) => setExpectedReturn(v as number)}
        />
      </div>

      {/* Results */}
      <div className="border-t pt-4 space-y-1 text-sm">
        <p>
          <strong>Total Withdrawal:</strong>{" "}
          ₹{formatCurrency(Math.round(result.totalWithdrawn))}
        </p>
        <p>
          <strong>Remaining Corpus:</strong>{" "}
          ₹{formatCurrency(Math.round(result.remainingCorpus))}
        </p>
        <p>
          <strong>Net Gain / Loss:</strong>{" "}
          ₹{formatCurrency(Math.round(result.netGain))}
        </p>
      </div>

      {/* Info box */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3 text-sm text-gray-700">
        <h2 className="text-sm font-semibold text-gray-900">
          About Systematic Withdrawal Plan (SWP)
        </h2>

        <p>
          A Systematic Withdrawal Plan (SWP) allows investors to withdraw a
          fixed amount regularly from their investment corpus, commonly used
          for retirement income or regular cash flow.
        </p>

        <p>
          The remaining corpus continues to earn returns, helping manage
          longevity risk and inflation impact.
        </p>

        <p>
          This calculator provides indicative results assuming constant
          returns and monthly withdrawals. Actual outcomes may vary due to
          market performance.
        </p>
      </div>
    </div>
  );
}
