import { EmailTemplate } from "@/components/email-template";
import { prisma } from "@/lib/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await resend.emails.send({
      from: "Acme <noreply@yourdomain.com>",
      to: ["amitmishra15102@gmail.com"],
      subject: body.subject,
      react: EmailTemplate({
        name: body.name,
        email: body.email,
        message: body.message,
        subject: body.subject,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.upsert({
        where: { email: body.email },
        update: {},
        create: { name: body.name, email: body.email },
      });

      await tx.message.create({
        data: {
          userId: user.id,
          subject: body.subject,
          message: body.message,
        },
      });
    });

    return Response.json({ message: "Message Sent Successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
