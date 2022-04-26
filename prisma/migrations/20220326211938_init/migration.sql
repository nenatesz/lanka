/*
  Warnings:

  - You are about to drop the column `userName` on the `AdminUsers` table. All the data in the column will be lost.
  - Added the required column `username` to the `AdminUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdminUsers" DROP COLUMN "userName",
ADD COLUMN     "username" TEXT NOT NULL;
