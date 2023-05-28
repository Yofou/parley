import lucia from "lucia-auth";
import { sveltekit } from "lucia-auth/middleware";
import prisma from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "prisma";
import { dev } from "$app/environment";

export const client = new PrismaClient()

export const auth = lucia({
	adapter: prisma(client),
	env: dev ? "DEV" : "PROD",
  middleware: sveltekit(),
  transformDatabaseUser: (user) => ({
    id: user.id,
    username: user.username
  })
});

export type Auth = typeof auth;
