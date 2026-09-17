import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Row,
  Column,
  Tailwind,
} from "@react-email/components";

const GymWelcomeEmail = (props: {
  userName: string;
  planName: "basic" | "pro";
}) => {
  const { userName, planName } = props;
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-lg shadow-lg max-w-150 mx-auto text-black">
            <Section className="bg-linear-to-r from-red-600 to-red-700 text-white text-center py-10 rounded-t-lg">
              <Heading className="text-[32px] font-bold m-0 mb-2 text-black">
                Welcome to FitZone Gym! 💪
              </Heading>
              <Text className="text-[18px] m-0 opacity-90 text-black">
                Your fitness journey starts now
              </Text>
            </Section>

            <Section className="px-10 py-8">
              <Text className="text-[18px] mb-6 leading-relaxed">
                Hi {userName},
              </Text>

              <Text className="text-[16px] mb-6 leading-relaxed">
                Congratulations! 🎉 Your gym membership has been successfully
                activated. We're thrilled to have you join our fitness community
                and can't wait to help you achieve your health and wellness
                goals.
              </Text>

              <Section className="bg-gray-50 rounded-lg p-6 mb-8">
                <Heading className="text-[20px] font-bold text-gray-800 mb-4 m-0">
                  Your Membership Details
                </Heading>
                <Row>
                  <Column>
                    <Text className="text-[14px] text-gray-600 mb-1 m-0 font-semibold">
                      Plan:
                    </Text>
                    <Text className="text-[16px] text-gray-800 mb-3 m-0">
                      {planName}
                    </Text>
                  </Column>
                </Row>
                <Row>
                  <Column>
                    <Text className="text-[14px] text-gray-600 mb-1 m-0 font-semibold">
                      Price:
                    </Text>
                    <Text className="text-[16px] text-gray-800 mb-3 m-0">
                      {planName === "basic" ? "€25" : "€40"} / monthly
                    </Text>
                  </Column>
                </Row>
                <Row>
                  <Column>
                    <Text className="text-[14px] text-gray-600 mb-1 m-0 font-semibold">
                      Start Date:
                    </Text>
                    <Text className="text-[16px] text-gray-800 m-0">
                      Today, {new Date().toLocaleDateString()}
                    </Text>
                  </Column>
                </Row>
              </Section>

              <Text className="text-[16px] text-gray-700 mb-6 leading-relaxed">
                We're excited to be part of your fitness journey and look
                forward to seeing you at the gym soon!
              </Text>

              <Text className="text-[16px] text-gray-700 leading-relaxed">
                Stay strong,
                <br />
                <strong>The FitZone Team</strong>
              </Text>
            </Section>

            <Hr className="border-gray-200 my-8" />

            <Section className="px-10 pb-10">
              <Text className="text-[12px] text-gray-500 text-center leading-relaxed m-0">
                FitZone Gym | Calle del Fitness 123, 18600 Motril, Granada,
                Spain
              </Text>
              <Text className="text-[12px] text-gray-500 text-center leading-relaxed m-0 mt-2">
                <a
                  href="https://fitzone.com/unsubscribe"
                  className="text-gray-500 underline"
                >
                  Unsubscribe
                </a>{" "}
                |
                <a
                  href="https://fitzone.com/privacy"
                  className="text-gray-500 underline ml-2"
                >
                  Privacy Policy
                </a>
              </Text>
              <Text className="text-[12px] text-gray-500 text-center leading-relaxed m-0 mt-2">
                © 2025 FitZone Gym. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default GymWelcomeEmail;
