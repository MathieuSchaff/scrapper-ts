const email = "my-email-here@gmail.com";
const jobSearch = "Développeur frontend";
const location = "France";
const numOfPages = 1;
export interface CommonConfig {
  jobSearch: string;
  location: string;
  numOfPages?: number;
}
// LINKEDIN CONFIG
export interface LinkedInConfig {
  email: string;
  password: string;
  remote: number;
  datePosted: number;
  experienceLevel: number;
}
// INDEED CONFIG
export interface IndeedConfig {
  contractType: number;
  remote: number;
  datePosted: number;
}


// WELCOME TO THE JUNGLE CONFIG
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
type RemoteType = 'no' | 'punctual' | 'partial' | 'fulltime';
export interface WelcomeToTheJungleConfig {
  account?: {
    email: string;
    password: string;
  };
  filters?: {
    contractType?: WTTJGLContractType | number[];
    remote?: RemoteType;
    experienceLevel?: WTTJGLExperience;
  };
}

export interface Config {
  common: CommonConfig;
  linkedin?: LinkedInConfig;
  welcomeToTheJungle?: WelcomeToTheJungleConfig;
  indeed?: IndeedConfig;
}

export const config: Config = {
  common: {
    jobSearch,
    location,
    numOfPages,
  },
  // linkedin: {
  //   email: email,
  //   password: "mySecretPassword",
  //   remote: 1,
  //   datePosted: 1,
  //   experienceLevel: 4,
  // },
  welcomeToTheJungle: {
    filters: {
      contractType: [1, 2, 3, 4, 5, 6],
      experienceLevel: [0, 1]
    }
  },
  // indeed: {
  //   contractType: 1,
  //   remote: 1,
  //   datePosted: 1,
  // },
};
