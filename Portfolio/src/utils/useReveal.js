import { useEffect } from 'react'
export default function useReveal(){ useEffect(()=>{ const els = Array.from(document.querySelectorAll('[data-reveal]')); const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); }) }, {threshold:0.12}); els.forEach(el=> io.observe(el)); return ()=> io.disconnect(); }, []); }
