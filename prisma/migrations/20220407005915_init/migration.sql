-- CreateEnum
CREATE TYPE "Category" AS ENUM ('fans', 'lightings');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" "Category" NOT NULL DEFAULT E'lightings';
