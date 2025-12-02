import { useEffect } from 'react'
import { Scene } from '@/components/layout/Scene'
import VoltageButton from '@/components/common/VoltageButton'
import useReveal from '@/utils/useReveal'

export default function Hero() {
  useReveal()
  return (
    <section className="relative w-full overflow-hidden">
      <Scene>
        <div className="max-w-6xl mx-auto px-6 py-36 grid md:grid-cols-2 gap-12 items-center" style={{ transformStyle: 'preserve-3d' }}>

          <div className="reveal relative z-10" data-reveal style={{ transform: 'translateZ(40px)' }}>
            <h1 className="text-6xl font-semibold title-grad leading-tight">Crafting Modern Software</h1>
            <p className="text-lg text-[#1c1c1e] mt-6 max-w-xl leading-relaxed">
              A clean, thoughtful and forward‑looking engineering approach inspired by premium product design.
              I focus on reliability, simplicity and seamless user experience.
            </p>
            <div className="mt-10 flex gap-4 items-center">
              <a href="#projects" style={{ transform: 'translateZ(60px)' }}>
                <VoltageButton>View Projects</VoltageButton>
              </a>
            </div>
          </div>

          <div className="reveal flex justify-center relative z-10" data-reveal style={{ transform: 'translateZ(80px)' }}>
            <div className="depth-card" style={{ transform: 'translateZ(80px)' }}>
              <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_kyu7xb1v.json" background="transparent" speed="1" style={{ width: '340px', height: '340px' }} loop autoplay></lottie-player>
            </div>
          </div>

        </div>
      </Scene>
    </section>
  )
}
