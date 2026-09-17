import { Resend } from "resend";
import EmailVerification from '../components/email/email-verify';

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const from = import.meta.env.RESEND_FROM ?? "Acme <onboarding@resend.dev>";

export async function sendEmailVerification(email: string, url: string) {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [email],
      subject: "Verify your email",
      react: <EmailVerification userEmail={email} verificationUrl={url} />,
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
