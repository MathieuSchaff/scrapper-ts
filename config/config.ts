const email = "my-email-here@gmail.com";
const jobSearch = "Développeur frontend";
const location = "France";
const numOfPages = 1;

export interface CommonConfig {
  jobSearch: string;
  location: string;
  numOfPages: number;
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
  contractType: string;
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
