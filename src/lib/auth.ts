import { betterAuth } from "better-auth";
import { polar, checkout, webhooks } from "@polar-sh/better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { Plan, Role } from "../../prisma/generated/enums";
import { sendEmailVerification } from "../utils/send-email-verification";
import { POLAR_PRODUCTS, polarClient } from "./polar-client";
import { postSubscription } from "@/utils/post-subscrition";

export const auth = betterAuth({
  trustedOrigins: [import.meta.env.BETTER_AUTH_URL],
  secret: import.meta.env.BETTER_AUTH_SECRET,
  baseURL: import.meta.env.BETTER_AUTH_URL,
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: POLAR_PRODUCTS.basic,
              slug: "basic",
            },
            {
              productId: POLAR_PRODUCTS.pro,
              slug: "pro",
            },
          ],
        }),

        webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET ?? "",
          onSubscriptionCreated: async (event) => {
            postSubscription(
              event.data.customer.email as string,
              event.data.customer.id,
              event.data.product.name,
              event.data.product.id as "basic" | "pro",
            );
          },

          onSubscriptionUpdated: async (event) => {
            postSubscription(
              event.data.customer.email as string,
              event.data.customer.id,
              event.data.product.name,
              event.data.product.id as "basic" | "pro",
            );
          },
          onSubscriptionCanceled: async (event) => {
            const { customerId } = event.data;
            await prisma.user.update({
              where: {
                id: customerId,
              },
              data: {
                plan: Plan.FREE,
              },
            });
          },
        }),
      ],
    }),
  ],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    async sendVerificationEmail({ user, url, token }, request) {
      await sendEmailVerification(user.email, url);
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        enum: [Role.USER, Role.ADMIN],
        required: false,
      },
      plan: {
        type: "string",
        enum: [Plan.FREE, Plan.BASIC, Plan.PRO],
        required: false,
      },
    },
  },
});
