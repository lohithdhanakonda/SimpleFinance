"use client";

import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function formatCurrency(v: number) {
  return v.toLocaleString("en-IN");
}

function calculatePPF(annual: number, rate: number, years: number) {
  let balance = 0;
  for (let i = 1; i <= years; i++) {
    balance = (balance + annual) * (1 + rate / 100);
  }
  return balance;
}

export default function PPFCalculator() {
  const [annual, setAnnual] = useState(150000);
  const [rate, setRate] = useState(7.1);
  const years = 15;

  const maturity = calculatePPF(annual, rate, years);
  const invested = annual * years;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white border rounded-lg">
      <h2 className="text-lg font-semibold">PPF Calculator</h2>

      <div>
        <label>Annual Contribution (₹)</label>
        <input
          type="number"
          value={annual}
          onChange={(e) => setAnnual(Number(e.target.value))}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Interest Rate (%): {rate}</label>
        <Slider min={6} max={8} step={0.1} value={rate} onChange={(v) => setRate(v as number)} />
      </div>

      <div className="border-t pt-4 text-sm">
        <p><strong>Total Invested:</strong> ₹{formatCurrency(invested)}</p>
        <p><strong>Maturity Amount:</strong> ₹{formatCurrency(Math.round(maturity))}</p>
      </div>
    </div>
  );
}
