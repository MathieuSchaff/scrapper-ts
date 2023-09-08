const email = "my-email-here@gmail.com";
const jobSearch = "Développeur frontend";
const location = "France";
const numOfPages = 1;
export type WTTJGLContractType =
  | "Permanent contract"
  | "Work-study"
  | "Internship"
  | "Fixed-term / Temporary"
  | "Other"
  | "Freelance"
  | "all"
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6;
export type WTTJGLExperience = Array<0 | 1 | 2 | 3 | 4>;
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
  account?: {
    email: string;
    password: string;
  };
  filters?: {
    contractType?: WTTJGLContractType | number[];
    remote?: string;
    experienceLevel?: WTTJGLExperience;
  };
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
    filters: {
      experienceLevel: [0, 1]
    }
  },
  indeed: {
    contractType: 1,
    remote: 1,
    datePosted: 1,
  },
};
