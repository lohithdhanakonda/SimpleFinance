"use client";

import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import BankRDRates from "@/app/config/rates/banksRDRates";
import Banks from "@/app/config/institutions/banks";

/* ---------- Helpers ---------- */

function formatCurrency(value: number) {
  return value.toLocaleString("en-IN");
}

function parseNumber(value: string) {
  return Number(value.replace(/,/g, ""));
}

function monthsFromInput(
  mode: "months" | "days" | "daterange",
  value: number,
  startDate?: string,
  endDate?: string
) {
  if (mode === "months") return value;
  if (mode === "days") return Math.floor(value / 30);
  if (mode === "daterange" && startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays =
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    return Math.floor(diffDays / 30);
  }
  return 0;
}

function getSuggestedRate(
  bankCode: string,
  months: number,
  isSenior: boolean
) {
  const bank = BankRDRates[bankCode];
  if (!bank) return 6.5;

  const slab = bank.rates.find(
    (r: any) => months >= r.minMonths && months <= r.maxMonths
  );

  return slab ? (isSenior ? slab.senior : slab.general) : 6.5;
}

function calculateRD(monthly: number, months: number, rate: number) {
  const r = rate / 100 / 12;
  let maturity = 0;

  for (let i = 0; i < months; i++) {
    maturity += monthly * Math.pow(1 + r, months - i);
  }

  return maturity;
}

/* ---------- Component ---------- */

export default function RDForm() {
  const [monthlyInput, setMonthlyInput] = useState("10,000");

  const [bank, setBank] = useState("SBI");
  const [customBank, setCustomBank] = useState(false);
  const [customBankName, setCustomBankName] = useState("");

  const [isSenior, setIsSenior] = useState(false);

  const [tenureMode, setTenureMode] =
    useState<"months" | "days" | "daterange">("months");
  const [tenureValue, setTenureValue] = useState(24);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [rate, setRate] = useState(6.5);

  const monthly = parseNumber(monthlyInput);
  const months = monthsFromInput(
    tenureMode,
    tenureValue,
    startDate,
    endDate
  );

  useEffect(() => {
    if (customBank) return;
    setRate(getSuggestedRate(bank, months, isSenior));
  }, [bank, months, isSenior, customBank]);

  const maturity = calculateRD(monthly, months, rate);
  const totalInvestment = monthly * months;

  return (
    <div className="bg-white border rounded-lg px-4 sm:px-6 py-6 space-y-5">
      {/* Monthly Amount */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Monthly Amount (₹)
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

      {/* Bank */}
      <div>
        <label className="block text-sm font-medium mb-1">Bank</label>

        {!customBank ? (
          <select
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="border rounded-md p-2 sm:p-3 w-full text-sm sm:text-base"
          >
            {Banks.map((b: any) => (
              <option key={b.code} value={b.code}>
                {b.name}
              </option>
            ))}
          </select>
        ) : (
          <input
            placeholder="Enter Bank Name"
            value={customBankName}
            onChange={(e) => setCustomBankName(e.target.value)}
            className="border rounded-md p-2 sm:p-3 w-full text-sm sm:text-base"
          />
        )}

        <label className="flex items-center gap-2 mt-2 text-sm">
          <input
            type="checkbox"
            checked={customBank}
            onChange={() => setCustomBank(!customBank)}
          />
          Use custom bank
        </label>
      </div>

      {/* Senior */}
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={isSenior}
          onChange={() => setIsSenior(!isSenior)}
        />
        Senior Citizen
      </label>

      {/* Tenure */}
      <div>
        <label className="block text-sm font-medium mb-1">Tenure</label>

        <div className="flex flex-wrap gap-4 mb-2 text-sm">
          {["months", "days", "daterange"].map((m) => (
            <label key={m} className="flex items-center gap-1">
              <input
                type="radio"
                checked={tenureMode === m}
                onChange={() => setTenureMode(m as any)}
              />
              {m}
            </label>
          ))}
        </div>

        {tenureMode !== "daterange" ? (
          <input
            type="number"
            value={tenureValue}
            onChange={(e) => setTenureValue(Number(e.target.value))}
            className="border rounded-md p-2 sm:p-3 w-full text-sm sm:text-base"
          />
        ) : (
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded-md p-2 text-sm w-full"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded-md p-2 text-sm w-full"
            />
          </div>
        )}
      </div>

      {/* Interest Rate */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Interest Rate (%)
        </label>

        <Slider
          min={0}
          max={15}
          step={0.05}
          value={rate}
          onChange={(v) => setRate(v as number)}
        />

        <input
          type="number"
          step="0.05"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="border rounded-md p-2 w-32 mt-2 text-sm"
        />
      </div>

      {/* Result */}
      <div className="border-t pt-4 text-sm space-y-1">
        <p>
          You invest ₹{formatCurrency(monthly)} per month for {months} months in{" "}
          {customBank ? customBankName || "Custom Bank" : bank}
        </p>
        <p>
          <strong>Total Investment:</strong> ₹
          {formatCurrency(totalInvestment)}
        </p>
        <p>
          <strong>Estimated Maturity:</strong> ₹
          {formatCurrency(Math.round(maturity))}
        </p>
      </div>
    </div>
  );
}
