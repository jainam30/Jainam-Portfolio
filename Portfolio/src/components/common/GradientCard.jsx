import React from 'react'
import Link from 'next/link'
import styled, { keyframes } from 'styled-components'

const rotateAnim = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export default function GradientCard({ children, index = 0, url }) {
  return (
    <StyledWrapper>
      {url ? (
        <Link href={url} className="project-link" aria-label="Open project">
          <div className="gradient-card">
            <div className="gradient-overlay" />
            <div className="content">{children}</div>
          </div>
        </Link>
      ) : (
        <div className="gradient-card">
          <div className="gradient-overlay" />
          <div className="content">{children}</div>
        </div>
      )}
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  .project-link { display:block; border-radius:20px; text-decoration: none; }
  .project-link:focus-visible { outline: 3px solid var(--accent-primary); outline-offset:4px }

  .gradient-card {
    width: 100%;
    min-height: 200px;
    background: var(--black-bg);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    transition: all 400ms cubic-bezier(.2,.9,.2,1);
    transform-style: preserve-3d;
  }

  .gradient-card .content { 
    position: relative; 
    z-index: 3; 
    padding: 2rem; 
    max-width: 100%;
  }

  .gradient-card .content h1,
  .gradient-card .content h2,
  .gradient-card .content h3,
  .gradient-card .content h4,
  .gradient-card .content p,
  .gradient-card .content span {
    color: var(--text-primary) !important;
  }

  .gradient-card::before {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg at 50% 50%, 
      var(--accent-primary) 0%, 
      var(--accent-light) 15%,
      transparent 30%,
      var(--accent-dark) 45%,
      var(--accent-primary) 60%,
      transparent 75%,
      #FFF 90%,
      var(--accent-primary) 100%
    );
    animation: ${rotateAnim} 4s linear infinite;
    filter: blur(15px);
    z-index: 0;
    opacity: 0.6;
  }

  .gradient-card::after {
    content: "";
    position: absolute;
    inset: 2px;
    background: linear-gradient(135deg, var(--black-secondary) 0%, var(--black-bg) 100%);
    border-radius: 18px;
    z-index: 1;
    box-shadow: inset 0 0 40px rgba(100, 255, 218, 0.05);
  }

  .gradient-card .gradient-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, transparent 30%, var(--black-bg) 90%);
    z-index: 2;
    opacity: 0.8;
  }

  @media (max-width: 640px) {
    .gradient-card { 
      min-height: 160px; 
      border-radius: 16px; 
    }
    .gradient-card .content { 
      padding: 1.5rem; 
    }
    .gradient-card::before { 
      filter: blur(10px); 
    }
  }

  .gradient-card:hover {
    transform: translateY(-12px) rotateX(4deg) rotateY(2deg);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.4),
      0 0 50px rgba(100, 255, 218, 0.1);
  }

  .gradient-card:hover::before {
    opacity: 1;
    animation-duration: 2s;
  }

  .project-link:hover .gradient-card {
     border-color: var(--accent-primary);
  }
`

