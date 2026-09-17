import { POLAR_PRODUCTS } from "@/lib/polar-client";
import prisma from "@/lib/prisma";
import { Resend } from "resend";
import { Plan } from "../../prisma/generated/enums";
import GymWelcomeEmail from "@/components/email/post-subscription";
import { createInvoicePDF } from "./create-invoice-pdf";

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const from = import.meta.env.RESEND_FROM ?? "Acme <onboarding@resend.dev>";

export const postSubscription = async (
  customerId: string,
  productId: string,
  customerEmail: string,
  planName: "basic" | "pro",
) => {
  const productAsscociated =
    productId === POLAR_PRODUCTS.basic || productId === POLAR_PRODUCTS.pro;
  if (productAsscociated) {
    await prisma.user.update({
      where: {
        id: customerId,
      },
      data: {
        plan: productId === POLAR_PRODUCTS.basic ? Plan.BASIC : Plan.PRO,
      },
    });
    const invoiceNumber = crypto.randomUUID();
    const pdfBytes = await createInvoicePDF({
      customerEmail,
      currency: "EUR",
      amount: planName === "basic" ? 25 : 40,
      customerName: "my name",
      membershipType: planName,
      invoiceNumber: invoiceNumber,
      date: new Date(),
      companyName: "FitZone Gym",
    });

    try {
      const { data, error } = await resend.emails.send({
        from,
        to: [customerEmail],
        subject: "Welcome to your gym!",
        react: <GymWelcomeEmail userName={customerEmail} planName={planName} />,
        attachments: [
          {
            filename: `invoice-${invoiceNumber}.pdf`,
            content: Buffer.from(pdfBytes),
          },
        ],
      });

      if (error) {
        console.error("Resend error:", error);
        return { error };
      }

      console.log("Resend email sent:", data);
      return { data };
    } catch (err) {
      console.error("Failed to send verification email:", err);
      return { error: err };
    }
  }
};
