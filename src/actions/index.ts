import {
  POLAR_PRODUCTS,
  polarClient,
  type PolarProductType,
} from "@/lib/polar-client";
import prisma from "@/lib/prisma";
import { createSecureAccessHash } from "@/utils/create-secure-access-hash";
import { z } from "astro/zod";
import { ActionError, defineAction } from "astro:actions";

import Pusher from "pusher";
import { Plan } from "../../prisma/generated/enums";

export const server = {
  createCheckout: defineAction({
    input: z.object({
      plan: z.enum(["basic", "pro"]),
      userId: z.string(),
      successUrl: z.string().url(),
    }),
    handler: async (input) => {
      const { plan, userId, successUrl } = input;
      const productId = POLAR_PRODUCTS[plan as PolarProductType];
      try {
        const checkout = await polarClient.checkouts.create({
          products: [productId],
          externalCustomerId: userId,
          successUrl,
        });
        const normalizedPlan = plan === "basic" ? Plan.BASIC : Plan.PRO;

        await prisma.user.update({
          where: { id: userId },
          data: {
            plan: normalizedPlan,
          },
        });
        return checkout;
      } catch (error) {
        console.error("❌ POLAR CHECKOUT ERROR:", error);

        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create checkout",
        });
      }
    },
  }),
  createSecureHash: defineAction({
    input: z.object({
      userId: z.string(),
      expiresAt: z.number(),
      membershipType: z.enum(["FREE", "BASIC", "PRO"]),
      nonce: z.string(),
    }),
    handler: async (input) => {
      try {
        const { userId, membershipType, expiresAt, nonce } = input;
        const hash = createSecureAccessHash({
          userId,
          membershipType,
          expiresAt,
          nonce,
        });
        return hash;
      } catch (error) {
        console.error("❌ SECURE HASH ERROR:", error);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create secure hash",
        });
      }
    },
  }),
  notifyNewMessage: defineAction({
    input: z.object({
      userId: z.string(),
    }),
    handler: async (input) => {
      const { userId } = input;

      const pusher = new Pusher({
        appId: "2195237",
        key: import.meta.env.PUSHER_KEY,
        secret: import.meta.env.PUSHER_SECRET,
        cluster: "us2",
        useTLS: true,
      });

      pusher.trigger("gym-access", "new-access", {
        userId,
        timestamp: new Date().toISOString(),
      });
    },
  }),
};
