import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, subject, message } = req.body || {}

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required' })
    }

    // Credentials from environment variables
    const GMAIL_USER = process.env.GMAIL_USER;
    const GMAIL_PASS = process.env.GMAIL_PASS;

    if (!GMAIL_USER || !GMAIL_PASS) {
      console.error('Missing GMAIL_USER or GMAIL_PASS environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: GMAIL_USER,
      to: GMAIL_USER, // Send to yourself
      replyTo: email, // Allow replying to the sender
      subject: `Portfolio Contact: ${subject || 'No Subject'}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Error in /api/contact:', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
