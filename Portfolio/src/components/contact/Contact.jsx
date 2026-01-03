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
    <section id="contact" className="py-28 text-center" style={{ position: 'relative', zIndex: 1 }}>
      <div className="max-w-4xl mx-auto px-6">
        <GradientCard index={3}>
          <h2 className="text-4xl font-semibold mb-5">Contact Me</h2>
          <p className="mb-8 text-lg" style={{ color: '#C4C4CC' }}>I'm open to full‑time SDE roles and collaborations.</p>

          <div className="flex flex-col md:flex-row gap-6 items-start justify-center text-sm">
            <div className="flex flex-col gap-5 w-full md:w-1/2">
              <div className="flex flex-col md:flex-row gap-4">
                <a href="tel:+917878597484" className="px-7 py-3 rounded-2xl transition-all" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#A78BFA', border: '1px solid rgba(139, 92, 246, 0.3)' }}>📞 +91 7878597484</a>
                <a href="mailto:jainamjainrj03@gmail.com" className="px-7 py-3 rounded-2xl transition-all" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#A78BFA', border: '1px solid rgba(139, 92, 246, 0.3)' }}>📧 jainamjainrj03@gmail.com</a>
              </div>

              <p className="text-sm" style={{ color: '#8B8B99' }}>Or send a message directly using the form.</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-4 rounded-lg" style={{ background: 'rgba(139, 92, 246, 0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
              {status.success && (
                <div className="mb-3 px-3 py-2 rounded" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22C55E', border: '1px solid rgba(34, 197, 94, 0.2)' }}>Message sent — thank you!</div>
              )}
              {status.success === false && (
                <div className="mb-3 px-3 py-2 rounded" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{status.error || 'Submission failed'}</div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex flex-col text-left">
                  <span className="text-xs font-medium" style={{ color: '#A78BFA' }}>Name</span>
                  <input name="name" value={form.name} onChange={handleChange} required className="mt-1 px-3 py-2 rounded-md" style={{ background: 'rgba(10, 10, 15, 0.5)', border: '1px solid rgba(139, 92, 246, 0.3)', color: '#F5F5F7' }} />
                </label>

                <label className="flex flex-col text-left">
                  <span className="text-xs font-medium" style={{ color: '#A78BFA' }}>Email</span>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required className="mt-1 px-3 py-2 rounded-md" style={{ background: 'rgba(10, 10, 15, 0.5)', border: '1px solid rgba(139, 92, 246, 0.3)', color: '#F5F5F7' }} />
                </label>
              </div>

              <label className="flex flex-col text-left mt-3">
                <span className="text-xs font-medium" style={{ color: '#A78BFA' }}>Subject</span>
                <input name="subject" value={form.subject} onChange={handleChange} className="mt-1 px-3 py-2 rounded-md" style={{ background: 'rgba(10, 10, 15, 0.5)', border: '1px solid rgba(139, 92, 246, 0.3)', color: '#F5F5F7' }} />
              </label>

              <label className="flex flex-col text-left mt-3">
                <span className="text-xs font-medium" style={{ color: '#A78BFA' }}>Message</span>
                <textarea name="message" value={form.message} onChange={handleChange} rows={5} required className="mt-1 px-3 py-2 rounded-md resize-y" style={{ background: 'rgba(10, 10, 15, 0.5)', border: '1px solid rgba(139, 92, 246, 0.3)', color: '#F5F5F7' }} />
              </label>

              <div className="mt-4 flex items-center justify-end">
                <button type="submit" disabled={status.submitting} className="px-4 py-2 rounded-md transition-all disabled:opacity-60" style={{ background: '#8B5CF6', color: 'white', boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' }}>
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
