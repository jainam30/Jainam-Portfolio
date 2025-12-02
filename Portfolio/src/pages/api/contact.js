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

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(String(email).toLowerCase())) {
      return res.status(400).json({ error: 'Invalid email address' })
    }

    // TODO: Integrate with an email provider (SendGrid, SMTP, etc.) if desired.
    // For now, just log the submission on the server and return success.
    console.log('Contact form submitted:', { name, email, subject, message })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Error in /api/contact:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}
