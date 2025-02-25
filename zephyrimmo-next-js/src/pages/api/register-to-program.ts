import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest,
  res: NextApiResponse) {
  if (req.method === "POST") {
    // Send Email
    const { name, email, programme, phoneNumber, message } = req.body;
    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.OFFICE365_USER, // Your Office 365 email address
        pass: process.env.OFFICE365_PASS, // Your Office 365 app password
      },
    });

    // Set up email data with unicode symbols
    let mailOptions = {
      from: `"HEPO DAKAR" <${process.env.OFFICE365_USER}>`, // Sender's address
      replyTo: email,
      to: process.env.OFFICE365_USER, // Receiver's address
      subject: `Inscription - ${programme}`, // Subject line
      text: `Nom: ${name}
            Email: ${email}
            Numéro de téléphone: ${phoneNumber}
            Programme: ${programme}
            Message:
            ${message}
            `, // Plain text body
      html: `<h4>Nom:</h4><p>${name}</p><h4>Email:</h4><p>${email}</p><h4>Programme:</h4><p>${programme}</p><h4>Numéro de Téléphone:</h4><p>${phoneNumber}</p><h4>Message:</h4><p>${message}</p>`, // HTML body content
    };

    try {
      // Send mail with defined transport object
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to send email', error });
    }
    
    res.status(200).json({ message: "Form submitted successfully!" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
  