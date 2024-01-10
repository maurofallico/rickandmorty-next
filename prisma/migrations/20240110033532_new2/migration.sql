/*
  Warnings:

  - Added the required column `image` to the `Characters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Characters" ADD COLUMN     "image" TEXT NOT NULL;
