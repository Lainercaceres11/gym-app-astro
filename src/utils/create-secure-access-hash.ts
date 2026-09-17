import type { Plan } from "../../prisma/generated/enums";
import crypto from "crypto";

export type QRAccessData = {
  userId: string;
  membershipType: (typeof Plan)[keyof typeof Plan];
  expiresAt: number;
  nonce: string;
};

export const createSecureAccessHash = (data: QRAccessData) => {
  const secureApiSecret = import.meta.env.SECURE_HASHING_KEY;

  if (!secureApiSecret) {
    throw new Error("SECURE_HASHING_KEY no está configurada");
  }

  const { expiresAt, membershipType, nonce, userId } = data;
  const payload = `${userId}-${expiresAt}-${membershipType}-${nonce}`;
  const secureHash = crypto
    .createHash("sha256")
    .update(`${payload}:${secureApiSecret}`)
    .digest("hex");
  return secureHash;
};
