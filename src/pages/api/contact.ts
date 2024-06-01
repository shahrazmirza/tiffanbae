import formData from "form-data";
import Mailgun from "mailgun.js";

export default async function handler(req, res) {
  console.log("Data", req.body);

  const { firstName, lastName, email, phoneNumber, message } = req.body;

  const API_KEY = process.env.MAILGUN_API_KEY || "";
  const DOMAIN = process.env.MAILGUN_DOMAIN || "";

  const mailgun = new Mailgun(formData);
  const client = mailgun.client({ username: "api", key: API_KEY });

  const messageData = {
    from: "Contact Form <info@tiffanbae.com.au>",
    to: "info@tiffanbae.com.au",
    subject: "New Client Query!",
    text: `
    Name: ${firstName} ${lastName}
    Email: ${email}
    Phone: ${phoneNumber}
    Message: ${message}
    `,
  };

  try {
    const emailRes = await client.messages.create(DOMAIN, messageData);
    console.log(emailRes);
  } catch (err) {
    console.error("Error sending email", err);
  }

  res.status(200).json({ submitted: true });
}
