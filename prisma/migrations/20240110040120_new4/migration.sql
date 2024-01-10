/*
  Warnings:

  - Changed the type of `species` on the `Characters` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Characters" DROP COLUMN "species",
ADD COLUMN     "species" TEXT NOT NULL;

-- DropEnum
DROP TYPE "species";
