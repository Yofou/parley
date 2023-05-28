/*
  Warnings:

  - You are about to drop the column `password` on the `auth_user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auth_user" DROP COLUMN "password";
