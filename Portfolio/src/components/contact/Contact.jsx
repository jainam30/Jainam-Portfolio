import React, { useState } from 'react'
import useReveal from '@/utils/useReveal'
import GradientCard from '../common/GradientCard'

export default function Contact() {
  useReveal();

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const [status, setStatus] = useState({ submitting: false, success: null, error: '' })

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus({ submitting: true, success: null, error: '' })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (!res.ok) {
        setStatus({ submitting: false, success: false, error: data?.error || 'Submission failed' })
        return
      }

      setStatus({ submitting: false, success: true, error: '' })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus({ submitting: false, success: false, error: 'Network error' })
    }
  }

  return (
    <section id="contact" className="py-28 text-center bg-white border-t border-[#E5E5E7]">
      <div className="max-w-4xl mx-auto px-6">
        <GradientCard index={3}>
          <h2 className="text-4xl font-semibold mb-5">Contact Me</h2>
          <p className="text-[#555] mb-8 text-lg">I’m open to full‑time SDE roles and collaborations.</p>

          <div className="flex flex-col md:flex-row gap-6 items-start justify-center text-sm">
            <div className="flex flex-col gap-5 w-full md:w-1/2">
              <div className="flex flex-col md:flex-row gap-4">
                <a href="tel:+917878597484" className="px-7 py-3 bg-[#F2F2F4] rounded-2xl">📞 +91 7878597484</a>
                <a href="mailto:jainamjainrj03@gmail.com" className="px-7 py-3 bg-[#F2F2F4] rounded-2xl">📧 jainamjainrj03@gmail.com</a>
              </div>

              <p className="text-sm text-[#666]">Or send a message directly using the form.</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow-sm border">
              {status.success && (
                <div className="mb-3 px-3 py-2 bg-green-50 text-green-800 border border-green-100 rounded">Message sent — thank you!</div>
              )}
              {status.success === false && (
                <div className="mb-3 px-3 py-2 bg-red-50 text-red-800 border border-red-100 rounded">{status.error || 'Submission failed'}</div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex flex-col text-left">
                  <span className="text-xs font-medium text-slate-600">Name</span>
                  <input name="name" value={form.name} onChange={handleChange} required className="mt-1 px-3 py-2 border rounded-md" />
                </label>

                <label className="flex flex-col text-left">
                  <span className="text-xs font-medium text-slate-600">Email</span>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required className="mt-1 px-3 py-2 border rounded-md" />
                </label>
              </div>

              <label className="flex flex-col text-left mt-3">
                <span className="text-xs font-medium text-slate-600">Subject</span>
                <input name="subject" value={form.subject} onChange={handleChange} className="mt-1 px-3 py-2 border rounded-md" />
              </label>

              <label className="flex flex-col text-left mt-3">
                <span className="text-xs font-medium text-slate-600">Message</span>
                <textarea name="message" value={form.message} onChange={handleChange} rows={5} required className="mt-1 px-3 py-2 border rounded-md resize-y" />
              </label>

              <div className="mt-4 flex items-center justify-end">
                <button type="submit" disabled={status.submitting} className="px-4 py-2 bg-sky-800 text-white rounded-md hover:bg-sky-900 disabled:opacity-60">
                  {status.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </GradientCard>
      </div>
    </section>
  )
}
