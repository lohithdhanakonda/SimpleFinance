import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Bharath Financial",
  description:
    "Contact Bharath Financial for feedback, suggestions, or questions related to Indian financial calculators.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white border rounded-lg">
      <h1 className="text-xl font-semibold">Contact</h1>

      <p className="text-sm text-gray-700">
        If you have feedback, suggestions, or questions related to Bharath
        Financial calculators, feel free to reach out.
      </p>

      <div className="text-sm text-gray-700 space-y-2">
        <p>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:bharathfinancial2026@gmail.com"
            className="text-blue-600 underline"
          >
            bharathfinancial2026@gmail.com
          </a>
        </p>

        <p>
          Bharath Financial is an independent, educational platform. We do not
          provide personalized investment advice.
        </p>
      </div>
    </div>
  );
}
