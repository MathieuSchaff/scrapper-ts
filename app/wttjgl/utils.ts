import type { WTTJGLContractType } from '../../config/config.ts';
const contractTypes = [
  {
    name: "Permanent contract",
    id: "jobs-search-all-modal-contract-FULL_TIME",
  },
  { name: "Work-study", id: "jobs-search-all-modal-contract-APPRENTICESHIP" },
  { name: "Internship", id: "jobs-search-all-modal-contract-INTERNSHIP" },
  {
    name: "Fixed-term / Temporary",
    id: "jobs-search-all-modal-contract-TEMPORARY",
  },
  { name: "Other", id: "jobs-search-all-modal-contract-OTHER" },
  { name: "Freelance", id: "jobs-search-all-modal-contract-FREELANCE" },
];

export default function getContractTypeId(contractType: WTTJGLContractType | number[]) {
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
