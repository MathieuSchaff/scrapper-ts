const email = "my-email-here@gmail.com";
const jobSearch = "Développeur frontend";
const location = "France";
const numOfPages = 1;
export type ContractType =
  | "Permanent contract"
  | "Work-study"
  | "Internship"
  | "Fixed-term / Temporary"
  | "Other"
  | "Freelance"
  | "Part-time"
  | "International Corporate Volunteer Program"
  | "Graduate program"
  | "Volunteer work"
  | "IDV"
  | "all"
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11;
export interface CommonConfig {
  jobSearch: string;
  location: string;
  numOfPages?: number;
}

export interface LinkedInConfig {
  email: string;
  password: string;
  remote: number;
  datePosted: number;
  experienceLevel: number;
}

export interface WelcomeToTheJungleConfig {
  email?: string;
  password?: string;
  contractType: ContractType | number[];
  remote: string;
}

export interface IndeedConfig {
  contractType: number;
  remote: number;
  datePosted: number;
}

export interface Config {
  common: CommonConfig;
  linkedin: LinkedInConfig;
  welcomeToTheJungle: WelcomeToTheJungleConfig;
  indeed: IndeedConfig;
}

export const config: Config = {
  common: {
    jobSearch,
    location,
    numOfPages,
  },
  linkedin: {
    email,
    password: "mySecretPassword",
    remote: 1,
    datePosted: 1,
    experienceLevel: 4,
  },
  welcomeToTheJungle: {
    // email: "myEmail@email.com",
    // password: "mySecretPassword",
    contractType: "all",
    remote: "all",
  },
  indeed: {
    contractType: 1,
    remote: 1,
    datePosted: 1,
  },
};
