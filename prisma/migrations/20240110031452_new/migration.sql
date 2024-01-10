-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Alive', 'Dead', 'unknown');

-- CreateEnum
CREATE TYPE "Species" AS ENUM ('Human', 'Alien', 'MythologicalCreature', 'Humanoid', 'Robot', 'Animal', 'Cronenberg', 'Disease', 'Poopybutthole', 'unknown');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Genderless', 'unknown');

-- CreateTable
CREATE TABLE "Characters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "species" "Species" NOT NULL,
    "gender" "Gender" NOT NULL,
    "origin" TEXT NOT NULL,

    CONSTRAINT "Characters_pkey" PRIMARY KEY ("id")
);
