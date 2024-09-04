import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
  subject: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
  subject,
}) => (
  <div>
    <h1>Welcome, {name}!</h1>
  </div>
);
