-- Creating the User table if it doesn't exist
CREATE TABLE
  IF NOT EXISTS "User" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) DEFAULT 'USER',
    CONSTRAINT valid_role CHECK (role IN ('USER', 'ADMIN'))
  );

-- Creating the Profile table if it doesn't exist
CREATE TABLE
  IF NOT EXISTS "Profile" (
    id SERIAL PRIMARY KEY,
    bio TEXT,
    userId INTEGER UNIQUE,
    CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES "User" (id)
  );

-- Creating the Job table if it doesn't exist
CREATE TABLE
  IF NOT EXISTS "Job" (
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

-- Enum for the Role field in the User table if it doesn't exist
CREATE TYPE IF NOT EXISTS "Role" AS ENUM ('USER', 'ADMIN');

-- Altering the User table to add the Role field if it doesn't exist
ALTER TABLE IF NOT EXISTS "User"
ADD COLUMN IF NOT EXISTS role "Role" DEFAULT 'USER';
