/*
  Warnings:

  - The `strengths` column on the `Overview` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `weaknesses` column on the `Overview` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Overview" DROP COLUMN "strengths",
ADD COLUMN     "strengths" TEXT[],
DROP COLUMN "weaknesses",
ADD COLUMN     "weaknesses" TEXT[];
