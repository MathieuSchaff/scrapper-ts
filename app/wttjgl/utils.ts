import type { ContractType } from '../../config/config.ts';
const contractTypes = [
  {
    name: "Permanent contract",
    id: "jobs-search-filter-contract-FULL_TIME",
  },
  { name: "Work-study", id: "jobs-search-filter-contract-APPRENTICESHIP" },
  { name: "Internship", id: "jobs-search-filter-contract-INTERNSHIP" },
  {
    name: "Fixed-term / Temporary",
    id: "jobs-search-filter-contract-TEMPORARY",
  },
  { name: "Other", id: "jobs-search-filter-contract-OTHER" },
  { name: "Freelance", id: "jobs-search-filter-contract-FREELANCE" },
  { name: "Part-time", id: "jobs-search-filter-contract-PART_TIME" },
  {
    name: "International Corporate Volunteer Program",
    id: "jobs-search-filter-contract-VIE",
  },
  {
    name: "Graduate program",
    id: "jobs-search-filter-contract-GRADUATE_PROGRAM",
  },
  { name: "Volunteer work", id: "jobs-search-filter-contract-VOLUNTEER" },
  { name: "IDV", id: "jobs-search-filter-contract-IDV" },
];

export default function getContractTypeId(contractType: ContractType | number[]) {
  if (!contractType) return null;
  // If contractType is an array of numbers, get the corresponding IDs
  if (Array.isArray(contractType)) {
    return contractType.map((index) => {
      const adjustedIndex = index - 1; // adjusting for zero-based indexing
      return contractTypes[adjustedIndex]?.id || null;
    });
  }
  if (typeof contractType === "number") {
    // If contractType is a number, get the corresponding id by index
    const index = contractType - 1; // adjusting for zero-based indexing
    return contractTypes[index]?.id || null;
  } else {
    // If contractType is a string, find the corresponding id
    const contract = contractTypes.find((ct) => ct.name === contractType);
    return contract?.id || null;
  }
}
