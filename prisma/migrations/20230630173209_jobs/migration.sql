-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "tags" DROP NOT NULL,
ALTER COLUMN "tags" SET DEFAULT '',
ALTER COLUMN "tags" SET DATA TYPE TEXT;