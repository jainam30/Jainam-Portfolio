import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

export default function ProjectCard({ title, desc, tech, index = 0, url = '#' }) {
  const tz = `${26 + index * 8}px`

  return (
    <StyledWrapper style={{ ['--tz']: tz }}>
      <Link href={url} className="project-link" aria-label={`${title} — view project`}>
        <div className="reveal card" data-reveal>
          <div className="gradient-overlay" />

          <div className="content">
            <h3 className="title">{title}</h3>
            <p className="desc">{desc}</p>
            <p className="tech">{tech}</p>
          </div>
        </div>
      </Link>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  .project-link { display:block; border-radius:20px; }
  .project-link:focus-visible { outline: 3px solid rgba(59,130,246,0.25); outline-offset:4px; border-radius:20px }

  .card {
    width: 100%;
    min-height: 220px;
    background: #07182e;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    transform: translateZ(var(--tz));
    transition: transform 220ms cubic-bezier(.2,.9,.2,1), box-shadow 220ms ease;
  }

  .card .content { position: relative; z-index: 3; padding: 1.25rem; max-width: 100%; }
  .card .title { color: #07182e; font-size: 1.25rem; margin:0 0 .5rem 0 }
  .card .desc { color: #333; font-size: .9rem; margin:0 0 .5rem 0 }
  .card .tech { color: #666; font-size: .8rem }

  .card::before {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg at 50% 50%,
      #00c3ff 0%,
      #7b2ff7 25%,
      #00f2c3 55%,
      #ffe600 85%,
      #00c3ff 100%
    );
    animation: rotateAnim 5s linear infinite;
    filter: blur(10px) brightness(1.15);
    z-index: 0;
  }

  .card::after {
    content: "";
    position: absolute;
    inset: 4px;
    background: #ffffff; /* inner area set to white */
    border-radius: 16px;
    z-index: 1;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.04);
  }

  .card .gradient-overlay {
    position: absolute;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, transparent 40%, #ffffff 80%);
    z-index: 2;
  }

  .project-link:hover .card,
  .project-link:focus-visible .card {
    transform: translateZ(var(--tz)) translateY(-8px) scale(1.02);
    box-shadow: 0 30px 60px rgba(0,0,0,0.35);
  }

  @keyframes rotateAnim {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`
