import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type ContactResponse = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ContactResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed. Please use POST.' 
    });
  }

  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required fields.' 
      });
    }

    // Configure transporter
    // In production, you would use real credentials stored in environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Set up email data
    const mailOptions = {
      from: `"Website Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL || 'czerwinskicez@gmail.com',
      replyTo: email,
      subject: `New message from ${name} via your website`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h3>New contact form submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Only actually send the email if we have credentials
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions);
    } else {
      console.log('Email would be sent in production. Email details:', mailOptions);
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent. I will get back to you soon!' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
} 