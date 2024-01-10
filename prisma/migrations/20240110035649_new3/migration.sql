/*
  Warnings:

  - Changed the type of `status` on the `Characters` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `species` on the `Characters` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gender` on the `Characters` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('Alive', 'Dead', 'unknown');

-- CreateEnum
CREATE TYPE "species" AS ENUM ('Human', 'Alien', 'MythologicalCreature', 'Humanoid', 'Robot', 'Animal', 'Cronenberg', 'Disease', 'Poopybutthole', 'unknown');

-- CreateEnum
CREATE TYPE "gender" AS ENUM ('Male', 'Female', 'Genderless', 'unknown');

-- AlterTable
ALTER TABLE "Characters" DROP COLUMN "status",
ADD COLUMN     "status" "status" NOT NULL,
DROP COLUMN "species",
ADD COLUMN     "species" "species" NOT NULL,
DROP COLUMN "gender",
ADD COLUMN     "gender" "gender" NOT NULL;

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "Species";

-- DropEnum
DROP TYPE "Status";
