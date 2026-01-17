const BankFDRates: Record<string, any> = {
    SBI: {
      bankCode: "SBI",
      bankName: "State Bank of India",
      compounding: "quarterly",
      rates: [
        {
          type: "regular",
          minMonths: 7,
          maxMonths: 23,
          general: 6.8,
          senior: 7.3,
          label: "7 months to less than 2 years",
        },
        {
          type: "regular",
          minMonths: 24,
          maxMonths: 35,
          general: 7.0,
          senior: 7.5,
          label: "2 years to less than 3 years",
        },
        {
          type: "regular",
          minMonths: 36,
          maxMonths: 59,
          general: 6.75,
          senior: 7.25,
          label: "3 years to less than 5 years",
        },
        {
          type: "regular",
          minMonths: 60,
          maxMonths: 120,
          general: 6.5,
          senior: 7.5,
          label: "5 years to 10 years",
        },
      ],
    },
  
    HDFC: {
      bankCode: "HDFC",
      bankName: "HDFC Bank",
      compounding: "quarterly",
      rates: [
        {
          type: "regular",
          minMonths: 7,
          maxMonths: 11,
          general: 6.6,
          senior: 7.1,
          label: "7 months to 11 months",
        },
        {
          type: "regular",
          minMonths: 12,
          maxMonths: 23,
          general: 7.1,
          senior: 7.6,
          label: "1 year to less than 2 years",
        },
        {
          type: "regular",
          minMonths: 24,
          maxMonths: 59,
          general: 6.9,
          senior: 7.4,
          label: "2 years to less than 5 years",
        },
        {
          type: "regular",
          minMonths: 60,
          maxMonths: 120,
          general: 6.5,
          senior: 7.0,
          label: "5 years and above",
        },
      ],
    },
  };
  
  export default BankFDRates;
  