/*
  Warnings:

  - Added the required column `icon` to the `BotConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `BotConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `BotConfig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BotConfig" ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "token" TEXT NOT NULL;
