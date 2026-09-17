import { Polar } from "@polar-sh/sdk";

export const polarClient = new Polar({
  accessToken: import.meta.env.POLAR_ACCESS_TOKEN,
  server: "sandbox",
});

export const POLAR_PRODUCTS = {
  basic: "ec2a5556-8c22-48dc-932e-f396bf99991e",
  pro: "5d950d47-8cac-4d65-a520-62dd2bb59345",
} as const;

export type PolarProductType = keyof typeof POLAR_PRODUCTS;
