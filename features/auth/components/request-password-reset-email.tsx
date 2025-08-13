import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Section,
    Heading,
    Text,
    Button,
    Hr,
    Img,
    Link,
} from "@react-email/components";

export interface RequestPasswordResetEmailProps {
    resetUrl: string;
    appName?: string;
    userName?: string;
    supportEmail?: string;
    logoUrl?: string;
    requestIp?: string;
    requestTimeISO?: string;
}

export const RequestPasswordResetEmail = ({
    resetUrl,
    appName = "Your App",
    userName,
    supportEmail = "support@example.com",
    logoUrl,
    requestIp,
    requestTimeISO,
}: RequestPasswordResetEmailProps) => {
    const previewText = `Reset your ${appName} password`;
    const when = requestTimeISO
        ? new Date(requestTimeISO).toUTCString()
        : undefined;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Body className="bg-gray-100 font-sans p-6">
                <Container className="bg-white rounded-xl border border-gray-200 max-w-lg mx-auto p-6">
                    {logoUrl && (
                        <Img
                            src={logoUrl}
                            width="48"
                            height="48"
                            alt={`${appName} logo`}
                            className="mx-auto mb-4"
                        />
                    )}

                    <Section>
                        <Heading className="text-2xl font-bold text-gray-900 mb-3">
                            Reset your {appName} password
                        </Heading>

                        <Text className="text-sm text-gray-700 mb-3">
                            {userName ? `Hi ${userName},` : "Hi there,"}
                        </Text>

                        <Text className="text-sm text-gray-700 mb-4">
                            We received a request to reset your password for{" "}
                            <strong>{appName}</strong>. Click the button below
                            to choose a new password. This link will expire for
                            your security.
                        </Text>

                        <div className="my-4">
                            <Button
                                href={resetUrl}
                                className="bg-gray-900 text-white px-5 py-3 rounded-lg font-semibold no-underline"
                            >
                                Reset password
                            </Button>
                        </div>

                        <Text className="text-xs text-gray-500">
                            If the button doesn’t work, copy and paste this URL
                            into your browser:
                        </Text>
                        <Text className="text-xs text-gray-500 break-all">
                            {resetUrl}
                        </Text>

                        {(requestIp || when) && (
                            <Text className="text-xs text-gray-500 mt-3">
                                Request details: {when ? `on ${when}` : ""}
                                {when && requestIp ? " · " : ""}
                                {requestIp ? `IP ${requestIp}` : ""}
                            </Text>
                        )}

                        <Text className="text-sm text-gray-700 mt-4">
                            Didn’t request this? You can safely ignore this
                            email. If you’re concerned, please{" "}
                            <Link
                                href={`mailto:${supportEmail}`}
                                className="text-gray-900 underline"
                            >
                                contact support
                            </Link>
                            .
                        </Text>

                        <Hr className="border-gray-200 my-6" />
                        <Text className="text-xs text-gray-500 text-center">
                            © {new Date().getFullYear()} {appName}. All rights
                            reserved.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};
