import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let animationFrameId
        let particles = []

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.size = Math.random() * 2 + 0.5
                this.speedX = Math.random() * 0.5 - 0.25
                this.speedY = Math.random() * 0.5 - 0.25
                this.opacity = Math.random() * 0.5 + 0.2
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                // Wrap around screen
                if (this.x > canvas.width) this.x = 0
                if (this.x < 0) this.x = canvas.width
                if (this.y > canvas.height) this.y = 0
                if (this.y < 0) this.y = canvas.height
            }

            draw() {
                ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        // Create particles
        const createParticles = () => {
            const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100)
            particles = []
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle())
            }
        }
        createParticles()

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw connections
            particles.forEach((particle, index) => {
                particle.update()
                particle.draw()

                // Connect nearby particles
                for (let j = index + 1; j < particles.length; j++) {
                    const dx = particles[j].x - particle.x
                    const dy = particles[j].y - particle.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 120) {
                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - distance / 120)})`
                        ctx.lineWidth = 0.5
                        ctx.beginPath()
                        ctx.moveTo(particle.x, particle.y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            })

            animationFrameId = requestAnimationFrame(animate)
        }
        animate()

        // Mouse interaction
        let mouseX = 0
        let mouseY = 0

        const handleMouseMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY

            particles.forEach(particle => {
                const dx = mouseX - particle.x
                const dy = mouseY - particle.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < 100) {
                    const angle = Math.atan2(dy, dx)
                    particle.x -= Math.cos(angle) * 2
                    particle.y -= Math.sin(angle) * 2
                }
            })
        }

        window.addEventListener('mousemove', handleMouseMove)

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas)
            window.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return <canvas ref={canvasRef} className="particle-canvas" />
}
