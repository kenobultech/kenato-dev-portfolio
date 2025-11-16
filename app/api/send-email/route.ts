// app/api/send-email/route.ts

import { NextResponse } from 'next/server';

// --- Configuration ---
const BREVO_API_KEY = process.env.BREVO_API_KEY;
// Your verified sender email
const VERIFIED_SENDER = "kenobul.tech@gmail.com"; 
const MY_EMAIL_ADDRESS = "kenobul.tech@gmail.com";

// Optional template (if set in .env)
const CONFIRMATION_TEMPLATE_ID = process.env.BREVO_CONFIRMATION_TEMPLATE_ID
  ? parseInt(process.env.BREVO_CONFIRMATION_TEMPLATE_ID)
  : null;

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

// --- Helper function to send email via Brevo API ---
interface BrevoEmailBody {
    sender: {
        name: string;
        email: string;
    };
    to: Array<{
        email: string;
        name?: string;
    }>;
    subject: string;
    htmlContent: string;
    [key: string]: unknown;
}

async function sendBrevoEmail(body: BrevoEmailBody): Promise<Response> {
    if (!BREVO_API_KEY) {
        throw new Error("BREVO_API_KEY is not set in environment variables.");
    }

    const response = await fetch(BREVO_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': BREVO_API_KEY,
        },
        body: JSON.stringify(body),
    });

    return response;
}


export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, subject, message, phone, botCheck } = data;

    // Honeypot (bot detection)
    if (botCheck) {
      console.log("Bot attempt blocked.");
      return NextResponse.json({ message: "OK" }, { status: 200 });
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const emailPromises: Promise<Response>[] = [];

    // ================================================================
    // A. SEND NOTIFICATION EMAIL (Viewer → You)
    // ================================================================
    const notificationEmailBody = {
        sender: {
            name: "Portfolio Contact Form",
            email: VERIFIED_SENDER,
        },
        to: [
            { email: MY_EMAIL_ADDRESS, name: "Kenneth Obul" }
        ],
        subject: `NEW CONTACT FORM: ${subject || "General Inquiry"}`,
        htmlContent: `
          <html>
            <body>
              <p>You have received a new message from your portfolio contact form:</p>
              <hr>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || "N/A"}</p>
              <p><strong>Subject:</strong> ${subject || "N/A"}</p>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap; border: 1px solid #ccc; padding: 10px; background: #f9f9f9;">${message}</p>
              <hr>
              <p>Sent via Next.js Portfolio API.</p>
            </body>
          </html>
        `,
    };
    emailPromises.push(sendBrevoEmail(notificationEmailBody));


    // ================================================================
    // B. SEND CONFIRMATION EMAIL (You → Viewer)
    // ================================================================
    let confirmationEmailBody: {
        sender: { name: string; email: string };
        to: { email: string; name: string }[];
        templateId?: string | number;
        params?: { [key: string]: string };
        subject?: string;
        htmlContent?: string;
    };
    
    if (CONFIRMATION_TEMPLATE_ID) {
        // Using template (API endpoint for template is the same, just requires templateId and params)
        confirmationEmailBody = {
            sender: { name: "Kenneth Obul", email: VERIFIED_SENDER },
            to: [{ email, name }],
            templateId: CONFIRMATION_TEMPLATE_ID,
            params: { contact_name: name }, // Must match your Brevo template variables
        };
    } else {
        // Simple fallback email (No template)
        confirmationEmailBody = {
            sender: { name: "Kenneth Obul", email: VERIFIED_SENDER },
            to: [{ email, name }],
            subject: "Your message has been received!",
            htmlContent: `
              <html>
                <body>
                  <p>Hello ${name},</p>
                  <p>Thank you for reaching out! I have received your message and will get back to you soon.</p>
                  <br>
                  <p>Best Regards,<br/>Kenneth Obul</p>
                </body>
              </html>
            `,
        };
    }

    // Fix: Ensure .subject is always present and is type 'string'
    if (
      "subject" in confirmationEmailBody &&
      (confirmationEmailBody.subject === undefined || confirmationEmailBody.subject === null)
    ) {
      confirmationEmailBody.subject = "";
    }

    emailPromises.push(sendBrevoEmail(confirmationEmailBody as BrevoEmailBody));

    // 3. Execute both email sends concurrently
    const results = await Promise.all(emailPromises);

    // 4. Check if both requests were successful
    const failedEmails = results.filter(res => !res.ok);
    
    if (failedEmails.length > 0) {
        // Log details of the first failure for debugging
        const errorResponse = await failedEmails[0].json();
        console.error("Brevo API Failed to send one or more emails:", errorResponse);
        return NextResponse.json(
            { 
                message: "Email sending failed for one or more recipients.", 
                error: errorResponse.message || "Brevo API error" 
            },
            { status: 500 }
        );
    }

    // 5. Success Response
    return NextResponse.json(
      { message: "Emails sent successfully" },
      { status: 200 }
    );

  } catch (err) {
    if (err instanceof Error) {
      console.error("API Error:", err);
      return NextResponse.json(
        { message: "Server error during email process", error: err.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown Error:", err);
      return NextResponse.json(
        { message: "Server error during email process", error: "Unknown error" },
        { status: 500 }
      );
    }
  }
}