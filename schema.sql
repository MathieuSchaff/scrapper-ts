-- Creating the User table
CREATE TABLE
  "User" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) DEFAULT 'USER',
    CONSTRAINT valid_role CHECK (role IN ('USER', 'ADMIN'))
  );

-- Creating the Profile table
CREATE TABLE
  "Profile" (
    id SERIAL PRIMARY KEY,
    bio TEXT,
    userId INTEGER UNIQUE,
    CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES "User" (id)
  );

-- Creating the Job table
CREATE TABLE
  "Job" (
    id SERIAL PRIMARY KEY,
    company VARCHAR(255),
    title VARCHAR(255),
    link VARCHAR(255),
    location VARCHAR(255),
    tags VARCHAR(255) DEFAULT '',
    details TEXT,
    time VARCHAR(255),
    createdAt TIMESTAMPTZ DEFAULT current_timestamp,
    authorId INTEGER,
    CONSTRAINT fk_author FOREIGN KEY (authorId) REFERENCES "User" (id) ON DELETE CASCADE
  );

-- Enum for the Role field in the User table
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- Altering the User table to add the Role field
ALTER TABLE "User"
ADD COLUMN role "Role" DEFAULT 'USER';
