import nodemailer from "nodemailer";

// Corrected transporter variable name
const transporter = nodemailer.createTransport({
  host: "mail.willsoft.co.ke",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || "verify@willsoft.co.ke", // Prefer using environment variables
    pass: process.env.SMTP_PASS || "archyJNR123.",
  },
});

const sendVerificationEmail = (email, token) => {
  const url = `http://localhost:3000/verify/${token}`;
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify Your Email</title>
        <style>
          /* Global Reset */
          body, table, td, a {
            text-decoration: none;
            font-family: Arial, sans-serif;
          }
          body {
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #4CAF50;
            color: white;
            text-align: center;
            padding: 20px;
          }
          .content {
            padding: 20px;
            text-align: center;
          }
          .content p {
            font-size: 16px;
            line-height: 1.5;
            color: #333333;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border-radius: 5px;
            text-align: center;
            font-size: 16px;
            margin-top: 20px;
            transition: background-color 0.3s;
          }
          .button:hover {
            background-color: #45a049;
          }
          .footer {
            background-color: #f4f4f4;
            padding: 10px;
            text-align: center;
            font-size: 12px;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Email Verification</h1>
          </div>
          <div class="content">
            <p>Hi there,</p>
            <p>
              Thank you for signing up! Please verify your email address by clicking
              the button below:
            </p>
            <a href="${url}" class="button">Verify Your Email</a>
            <p style="margin-top: 20px;">
              If you did not create an account, you can safely ignore this email.
            </p>
          </div>
          <div class="footer">
            <p>This is an automated message, please do not reply.</p>
            <p>&copy; 2024 Willsoft. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  transporter.sendMail(
    {
      from: "verify@willsoft.co.ke",
      to: email,
      subject: "Email Verification",
      html: htmlContent,
    },
    (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Verification email sent:", info.response);
      }
    }
  );
};

export default sendVerificationEmail;
