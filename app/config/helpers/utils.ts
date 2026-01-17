import BankRates from "../rates/banksRDRates";

export function getRate(
  bank: string,
  tenureValue: number,
  tenureUnit: "months" | "days",
  isSenior: boolean
): number | null {
  const months =
    tenureUnit === "days"
      ? Math.floor(tenureValue / 30)
      : tenureValue;

  const slab = BankRates[bank].rates.find(
    (r: any) =>
      r.type === "regular" &&
      months >= r.minMonths &&
      months <= r.maxMonths
  );

  return slab ? (isSenior ? slab.senior : slab.general) : null;
}
