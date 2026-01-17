"use client";

import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function formatCurrency(v: number) {
  return v.toLocaleString("en-IN");
}
function parseNumber(v: string) {
  return Number(v.replace(/,/g, ""));
}

function calculateEMI(P: number, r: number, n: number) {
  const monthlyRate = r / 100 / 12;
  const months = n * 12;

  const emi =
    (P * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = emi * months;
  const interest = totalPayment - P;

  return { emi, interest, totalPayment };
}

export default function EMICalculator() {
  const [amountInput, setAmountInput] = useState("10,00,000");
  const [rate, setRate] = useState(9);
  const [years, setYears] = useState(20);

  const principal = parseNumber(amountInput);
  const result = calculateEMI(principal, rate, years);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white border rounded-lg">
      <h2 className="text-lg font-semibold">EMI Calculator</h2>

      <div>
        <label>Loan Amount (₹)</label>
        <input
          value={amountInput}
          onChange={(e) =>
            setAmountInput(formatCurrency(parseNumber(e.target.value)))
          }
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Interest Rate (%): {rate}</label>
        <Slider min={5} max={20} step={0.1} value={rate} onChange={(v) => setRate(v as number)} />
      </div>

      <div>
        <label>Tenure: {years} years</label>
        <Slider min={1} max={30} value={years} onChange={(v) => setYears(v as number)} />
      </div>

      <div className="border-t pt-4 text-sm">
        <p><strong>Monthly EMI:</strong> ₹{formatCurrency(Math.round(result.emi))}</p>
        <p><strong>Total Interest:</strong> ₹{formatCurrency(Math.round(result.interest))}</p>
        <p><strong>Total Payment:</strong> ₹{formatCurrency(Math.round(result.totalPayment))}</p>
      </div>
    </div>
  );
}
