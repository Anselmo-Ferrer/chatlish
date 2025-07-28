-- CreateTable
CREATE TABLE "Phrase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "phrase" TEXT NOT NULL,
    "translation" TEXT NOT NULL,

    CONSTRAINT "Phrase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Phrase_id_key" ON "Phrase"("id");

-- AddForeignKey
ALTER TABLE "Phrase" ADD CONSTRAINT "Phrase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
