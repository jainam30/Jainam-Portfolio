import { useEffect, useState } from 'react'

export default function useScrollSection() {
    const [activeSection, setActiveSection] = useState('hero')

    useEffect(() => {
        const sections = [
            { id: 'hero', element: null },
            { id: 'about', element: null },
            { id: 'experience', element: null },
            { id: 'skills', element: null },
            { id: 'projects', element: null },
            { id: 'contact', element: null }
        ]

        // Get section elements
        sections.forEach(section => {
            section.element = document.getElementById(section.id) || document.querySelector(`section:has(#${section.id})`)
        })

        // Handle hero section (no ID, first section)
        if (!sections[0].element) {
            sections[0].element = document.querySelector('main > section:first-child')
        }

        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i]
                if (section.element) {
                    const sectionTop = section.element.offsetTop
                    const sectionBottom = sectionTop + section.element.offsetHeight

                    if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                        setActiveSection(section.id)
                        break
                    }
                }
            }
        }

        // Initial check
        handleScroll()

        // Debounced scroll listener
        let timeoutId
        const debouncedScroll = () => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(handleScroll, 100)
        }

        window.addEventListener('scroll', debouncedScroll)
        return () => {
            window.removeEventListener('scroll', debouncedScroll)
            clearTimeout(timeoutId)
        }
    }, [])

    return activeSection
}
