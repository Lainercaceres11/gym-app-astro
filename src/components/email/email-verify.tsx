import * as React from "react";

// Local fallback email component stubs so the template does not fail when
// @react-email/components is not installed in this workspace.
const Body = ({ children, className }: any) => (
  <body className={className}>{children}</body>
);
const Button = ({ href, className, children }: any) => (
  <a href={href} className={className}>
    {children}
  </a>
);
const Container = ({ children, className }: any) => (
  <div className={className}>{children}</div>
);
const Head = () => <></>;
const Heading = ({ children, className }: any) => (
  <h1 className={className}>{children}</h1>
);
const Html = ({ children, lang, dir }: any) => (
  <html lang={lang} dir={dir}>
    {children}
  </html>
);
const Link = ({ href, className, children }: any) => (
  <a href={href} className={className}>
    {children}
  </a>
);
const Preview = ({ children }: any) => <>{children}</>;
const Section = ({ children, className }: any) => (
  <section className={className}>{children}</section>
);
const Text = ({ children, className }: any) => (
  <p className={className}>{children}</p>
);
const Tailwind = ({ children }: any) => <>{children}</>;

const EmailVerification = (props: {
  userEmail: string;
  verificationUrl: string;
}) => {
  const { userEmail, verificationUrl } = props;

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        Verify your email address to complete your account setup
      </Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-lg shadow-sm max-w-150 mx-auto p-10">
            {/* Header */}
            <Section className="text-center mb-8">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-2">
                Verify Your Email Address
              </Heading>
              <Text className="text-4 text-gray-600 m-0">
                Welcome to Astro Pro! Please verify your email to get started.
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-8">
              <Text className="text-4 text-gray-700 mb-4] m-0">Hi there,</Text>
              <Text className="text-4 text-gray-700 mb-4] m-0">
                Thanks for signing up for Astro Pro! To complete your account
                setup and start using our platform, please verify your email
                address by clicking the button below.
              </Text>
              <Text className="text-4 text-gray-700 mb-6 m-0">
                We sent this verification email to: <strong>{userEmail}</strong>
              </Text>
            </Section>

            {/* Verification Button */}
            <Section className="text-center mb-8">
              <Button
                href={verificationUrl}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-4 font-semibold no-underline box-border inline-block"
              >
                Verify Email Address
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-8">
              <Text className="text-[14px] text-gray-600 mb-2 m-0">
                If the button doesn't work, copy and paste this link into your
                browser:
              </Text>
              <Link
                href={verificationUrl}
                className="text-blue-600 text-[14px] break-all"
              >
                {verificationUrl}
              </Link>
            </Section>

            {/* Security Notice */}
            <Section className="bg-gray-50 p-5 rounded-lg] mb-8">
              <Text className="text-[14px] text-gray-700 mb-2 m-0 font-semibold">
                🔒 Security Notice
              </Text>
              <Text className="text-[14px] text-gray-600 m-0">
                This verification link will expire in 24 hours for security
                reasons. If you didn't create an account with Astro Pro, you can
                safely ignore this email.
              </Text>
            </Section>

            {/* Help Section */}
            <Section className="mb-8">
              <Text className="text-[14px] text-gray-600 m-0">
                Need help? Contact our support team at{" "}
                <Link
                  href="mailto:support@astropro.com"
                  className="text-blue-600"
                >
                  support@company.com
                </Link>
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[6">
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-2]">
                © 2024 Astro Pro. All rights reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-2">
                123 Business Street, Suite 100, City, State 12345
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0">
                <Link href="#" className="text-gray-500 no-underline">
                  Unsubscribe
                </Link>
                {" | "}
                <Link href="#" className="text-gray-500 no-underline">
                  Privacy Policy
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailVerification;
