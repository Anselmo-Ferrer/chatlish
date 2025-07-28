/*
  Warnings:

  - You are about to drop the column `groupId` on the `Spreadsheet` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `Spreadsheet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Spreadsheet" DROP COLUMN "groupId",
DROP COLUMN "question";
