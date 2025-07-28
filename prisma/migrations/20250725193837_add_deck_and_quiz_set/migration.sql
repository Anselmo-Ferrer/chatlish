/*
  Warnings:

  - You are about to drop the column `groupId` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `groupName` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `groupId` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Quiz` table. All the data in the column will be lost.
  - Added the required column `deckId` to the `Flashcard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quizSetId` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Flashcard" DROP CONSTRAINT "Flashcard_userId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_userId_fkey";

-- AlterTable
ALTER TABLE "Flashcard" DROP COLUMN "groupId",
DROP COLUMN "groupName",
DROP COLUMN "userId",
ADD COLUMN     "deckId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "groupId",
DROP COLUMN "userId",
ADD COLUMN     "quizSetId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Deck" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizSet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "QuizSet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizSet" ADD CONSTRAINT "QuizSet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_quizSetId_fkey" FOREIGN KEY ("quizSetId") REFERENCES "QuizSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
