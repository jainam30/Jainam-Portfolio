import React from 'react'
import Link from 'next/link'
import styled, { keyframes } from 'styled-components'

const rotateAnim = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export default function GradientCard({ children, index = 0, url }) {
  const tz = `${20 + index * 6}px`

  const inner = (
    <div className="reveal gradient-card" data-reveal style={{ '--tz': tz }}>
      <div className="gradient-overlay" />
      <div className="content">{children}</div>
    </div>
  )

  return (
    <StyledWrapper>
      {url ? (
        <Link href={url} className="project-link" aria-label="Open project">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  .project-link { display:block; border-radius:20px }
  .project-link:focus-visible { outline: 3px solid rgba(59,130,246,0.25); outline-offset:4px }

  .gradient-card {
    width: 100%;
    min-height: 180px;
    background: #07182e;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 18px 36px rgba(0,0,0,0.18);
    transform: translateZ(var(--tz, 20px));
    transition: transform 220ms cubic-bezier(.2,.9,.2,1), box-shadow 220ms ease;
  }

  .gradient-card .content { 
    position: relative; 
    z-index: 3; 
    padding: 1.25rem; 
    max-width: 100% 
  }

  .gradient-card .content h1,
  .gradient-card .content h2,
  .gradient-card .content h3,
  .gradient-card .content h4,
  .gradient-card .content p,
  .gradient-card .content span {
    color: #1c1c1e !important;
  }

  .gradient-card::before {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    background: -webkit-conic-gradient(from 0deg at 50% 50%, #00c3ff 0%, #7b2ff7 25%, #00f2c3 55%, #ffe600 85%, #00c3ff 100%);
    background: conic-gradient(from 0deg at 50% 50%, #00c3ff 0%, #7b2ff7 25%, #00f2c3 55%, #ffe600 85%, #00c3ff 100%);
    animation: ${rotateAnim} 5s linear infinite;
    filter: blur(10px) brightness(1.15);
    z-index: 0;
  }

  .gradient-card::after {
    content: "";
    position: absolute;
    inset: 6px;
    background: #ffffff;
    border-radius: 14px;
    z-index: 1;
    box-shadow: inset 0 0 20px rgba(0,0,0,0.04);
  }

  .gradient-card .gradient-overlay {
    position: absolute;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, transparent 35%, rgba(255,255,255,0.85) 75%);
    z-index: 2;
  }

  @media (max-width: 640px) {
    .gradient-card { 
      min-height: 140px; 
      border-radius: 14px; 
    }
    .gradient-card .content { 
      padding: 1rem; 
    }
    .project-link { 
      border-radius: 14px; 
    }
    .gradient-card::before { 
      filter: blur(8px) brightness(1.05); 
    }
    .gradient-card .gradient-overlay { 
      width: 140%; 
      height: 140%; 
      background: radial-gradient(circle at center, transparent 20%, rgba(255,255,255,0.55) 80%); 
    }
  }

  .gradient-card:hover, .project-link:focus-visible .gradient-card {
    transform: translateZ(var(--tz, 20px)) translateY(-8px) scale(1.02);
    box-shadow: 0 30px 60px rgba(0,0,0,0.28);
  }
`
