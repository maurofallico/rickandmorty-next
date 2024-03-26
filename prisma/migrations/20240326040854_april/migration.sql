-- CreateEnum
CREATE TYPE "status" AS ENUM ('Alive', 'Dead', 'unknown');

-- CreateEnum
CREATE TYPE "gender" AS ENUM ('Male', 'Female', 'Genderless', 'unknown');

-- CreateTable
CREATE TABLE "Characters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "status" NOT NULL,
    "species" TEXT NOT NULL,
    "gender" "gender" NOT NULL,
    "origin" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "fav" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Characters_pkey" PRIMARY KEY ("id")
);
