/*
  Warnings:

  - Added the required column `iat` to the `AdminUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdminUsers" ADD COLUMN     "iat" TEXT NOT NULL;
