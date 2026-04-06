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

          <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center text-sm">
            <div className="flex flex-col gap-5 w-full md:w-1/2">
              <div className="flex flex-col gap-4">
                <a href="tel:+917878597484" className="px-7 py-4 rounded-2xl transition-all hover:bg-cyan-500/10" style={{ background: 'rgba(100, 255, 218, 0.03)', color: 'var(--accent-primary)', border: '1px solid rgba(100, 255, 218, 0.1)' }}>
                  <span className="mr-2">📞</span> +91 7878597484
                </a>
                <a href="mailto:jainamjainrj03@gmail.com" className="px-7 py-4 rounded-2xl transition-all hover:bg-cyan-500/10" style={{ background: 'rgba(100, 255, 218, 0.03)', color: 'var(--accent-primary)', border: '1px solid rgba(100, 255, 218, 0.1)' }}>
                  <span className="mr-2">📧</span> jainamjainrj03@gmail.com
                </a>
              </div>

              <p className="text-sm mt-4" style={{ color: 'var(--text-muted)' }}>Or send a message directly using the form.</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-6 rounded-2xl" style={{ background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(100, 255, 218, 0.1)' }}>
              {status.success && (
                <div className="mb-4 px-3 py-2 rounded text-sm" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#4ADE80', border: '1px solid rgba(34, 197, 94, 0.2)' }}>Message sent — thank you!</div>
              )}
              {status.success === false && (
                <div className="mb-4 px-3 py-2 rounded text-sm" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#F87171', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{status.error || 'Submission failed'}</div>
              )}
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col text-left">
                    <span className="text-xs font-semibold mb-1" style={{ color: 'var(--accent-primary)' }}>Name</span>
                    <input name="name" value={form.name} onChange={handleChange} required className="px-4 py-3 rounded-xl outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium" style={{ background: 'rgba(2, 6, 23, 0.5)', border: '1px solid rgba(100, 255, 218, 0.1)', color: 'var(--text-primary)' }} />
                  </label>

                  <label className="flex flex-col text-left">
                    <span className="text-xs font-semibold mb-1" style={{ color: 'var(--accent-primary)' }}>Email</span>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required className="px-4 py-3 rounded-xl outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium" style={{ background: 'rgba(2, 6, 23, 0.5)', border: '1px solid rgba(100, 255, 218, 0.1)', color: 'var(--text-primary)' }} />
                  </label>
                </div>

                <label className="flex flex-col text-left">
                  <span className="text-xs font-semibold mb-1" style={{ color: 'var(--accent-primary)' }}>Subject</span>
                  <input name="subject" value={form.subject} onChange={handleChange} required className="px-4 py-3 rounded-xl outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium" style={{ background: 'rgba(2, 6, 23, 0.5)', border: '1px solid rgba(100, 255, 218, 0.1)', color: 'var(--text-primary)' }} />
                </label>

                <label className="flex flex-col text-left">
                  <span className="text-xs font-semibold mb-1" style={{ color: 'var(--accent-primary)' }}>Message</span>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4} required className="px-4 py-3 rounded-xl outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium resize-none" style={{ background: 'rgba(2, 6, 23, 0.5)', border: '1px solid rgba(100, 255, 218, 0.1)', color: 'var(--text-primary)' }} />
                </label>
              </div>

              <div className="mt-6 flex items-center justify-end">
                <button type="submit" disabled={status.submitting} className="px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-60 bg-gradient-to-r from-cyan-400 to-cyan-600 text-slate-950 shadow-[0_0_20px_rgba(100,255,218,0.2)] hover:shadow-[0_0_30px_rgba(100,255,218,0.4)] hover:-translate-y-0.5 transform active:scale-95">
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
