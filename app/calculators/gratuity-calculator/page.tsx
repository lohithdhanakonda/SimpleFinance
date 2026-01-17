"use client";

import { useState } from "react";

function formatCurrency(v: number) {
  return v.toLocaleString("en-IN");
}

export default function GratuityCalculator() {
  const [salary, setSalary] = useState(50000);
  const [years, setYears] = useState(10);

  const gratuity = (salary * 15 * years) / 26;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4 bg-white border rounded-lg">
      <h2 className="text-lg font-semibold">Gratuity Calculator</h2>

      <div>
        <label>Last Drawn Monthly Salary (Basic + DA) ₹</label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Years of Service</label>
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          className="border p-2 w-full"
        />
      </div>

      <div className="border-t pt-4">
        <p>
          <strong>Estimated Gratuity:</strong> ₹
          {formatCurrency(Math.round(gratuity))}
        </p>
      </div>
    </div>
  );
}
