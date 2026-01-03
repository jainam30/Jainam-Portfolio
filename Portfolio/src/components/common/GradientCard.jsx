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
  .project-link:focus-visible { outline: 3px solid rgba(139, 92, 246, 0.5); outline-offset:4px }

  .gradient-card {
    width: 100%;
    min-height: 200px;
    background: #0A0A0F;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 18px 36px rgba(139, 92, 246, 0.25);
    transform: translateZ(var(--tz, 20px));
    transition: transform 300ms cubic-bezier(.2,.9,.2,1), box-shadow 300ms ease;
  }

  .gradient-card .content { 
    position: relative; 
    z-index: 3; 
    padding: 1.5rem; 
    max-width: 100% 
  }

  .gradient-card .content h1,
  .gradient-card .content h2,
  .gradient-card .content h3,
  .gradient-card .content h4,
  .gradient-card .content p,
  .gradient-card .content span {
    color: #F5F5F7 !important;
  }

  .gradient-card::before {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg at 50% 50%, 
      #8B5CF6 0%, 
      #C084FC 15%,
      #A78BFA 30%,
      #7C3AED 45%,
      #6D28D9 60%,
      #8B5CF6 75%,
      #C084FC 90%,
      #8B5CF6 100%
    );
    animation: ${rotateAnim} 6s linear infinite;
    filter: blur(12px) brightness(1.2);
    z-index: 0;
  }

  .gradient-card::after {
    content: "";
    position: absolute;
    inset: 4px;
    background: linear-gradient(135deg, #14141F 0%, #0A0A0F 100%);
    border-radius: 16px;
    z-index: 1;
    box-shadow: inset 0 0 30px rgba(139, 92, 246, 0.15);
  }

  .gradient-card .gradient-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, transparent 20%, rgba(10, 10, 15, 0.4) 80%);
    z-index: 2;
  }

  @media (max-width: 640px) {
    .gradient-card { 
      min-height: 160px; 
      border-radius: 16px; 
    }
    .gradient-card .content { 
      padding: 1.25rem; 
    }
    .project-link { 
      border-radius: 16px; 
    }
    .gradient-card::before { 
      filter: blur(10px) brightness(1.1); 
    }
  }

  .gradient-card:hover, .project-link:focus-visible .gradient-card {
    transform: translateZ(var(--tz, 20px)) translateY(-10px) scale(1.03);
    box-shadow: 
      0 30px 70px rgba(139, 92, 246, 0.4),
      0 0 60px rgba(139, 92, 246, 0.3);
  }

  .gradient-card:hover::before {
    filter: blur(15px) brightness(1.4);
  }
`

