import { useEffect, useRef } from 'react';

export function Scene({children}){
  const ref = useRef();
  const innerRef = useRef();

  useEffect(()=>{
    const el = ref.current;
    const inner = innerRef.current;
    if(!el || !inner) return;
    let bounding = el.getBoundingClientRect();
    function onMove(e){
      const x = (e.clientX - bounding.left) - bounding.width/2;
      const y = (e.clientY - bounding.top) - bounding.height/2;
      const rx = (-y / bounding.height) * 6;
      const ry = (x / bounding.width) * 6;
      inner.style.transform = `translateZ(0px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      el.style.setProperty('--mx', (x / bounding.width).toFixed(3));
      el.style.setProperty('--my', (y / bounding.height).toFixed(3));
    }
    function onLeave(){ inner.style.transform = `translateZ(0px) rotateX(0deg) rotateY(0deg)`; el.style.setProperty('--mx', 0); el.style.setProperty('--my', 0); }
    function onResize(){ bounding = el.getBoundingClientRect(); }
    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onResize);
    return ()=>{ window.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); window.removeEventListener('resize', onResize); }
  },[]);

  useEffect(()=>{
    const el = ref.current;
    if(!el) return;
    function onScroll(){ const sc = window.scrollY; el.style.setProperty('--scrollY', (sc / 1200).toFixed(3)); }
    window.addEventListener('scroll', onScroll); onScroll();
    return ()=> window.removeEventListener('scroll', onScroll);
  },[]);

  return (
    <div ref={ref} className="scene" style={{'--mx':0,'--my':0,'--scrollY':0}}>
      <div ref={innerRef} className="scene-inner">
        <VisionLayer depth={-140} className="vision-layer">
          <div className="decor" style={{left:'10%',top:'8%',width:220,height:220,background:'linear-gradient(180deg,#0ea5ff,#7c3aed)'}}/>
        </VisionLayer>

        <VisionLayer depth={-80} className="vision-layer">
          <div className="decor" style={{right:'12%',top:'18%',width:160,height:160,background:'linear-gradient(180deg,#34d399,#60a5fa)'}}/>
        </VisionLayer>

        <VisionLayer depth={-20} className="vision-layer">
          <div className="decor" style={{left:'50%',top:'6%',width:300,height:300,background:'linear-gradient(180deg,#f0abfc,#c084fc)'}}/>
        </VisionLayer>

        <div style={{transformStyle:'preserve-3d'}}>
          {children}
        </div>

        <VisionLayer depth={60} className="vision-layer">
          <div className="bloom" style={{right:'8%',bottom:'6%',background:'#7c3aed'}} />
        </VisionLayer>
      </div>
    </div>
  )
}

export function VisionLayer({depth, children, className}){
  const ref = useRef();
  useEffect(()=>{
    const el = ref.current;
    function update(){
      if(!el) return;
      const mx = parseFloat(getComputedStyle(el.parentElement).getPropertyValue('--mx') || 0);
      const my = parseFloat(getComputedStyle(el.parentElement).getPropertyValue('--my') || 0);
      const sy = parseFloat(getComputedStyle(el.parentElement).getPropertyValue('--scrollY') || 0);
      const dz = depth/100;
      const tx = mx * dz * 40; const ty = my * dz * 30 - sy*dz*40;
      el.style.transform = `translate3d(${tx}px, ${ty}px, ${depth}px) translateZ(0)`;
      el.style.opacity = `${Math.max(0.12, 1 - Math.abs(dz)*0.8)}`;
    }
    update();
    const obs = new MutationObserver(update);
    obs.observe(el.parentElement, {attributes:true, attributeFilter:['style']});
    const id = setInterval(update, 80);
    return ()=>{ obs.disconnect(); clearInterval(id); };
  }, [depth]);

  return (<div ref={ref} className={className} aria-hidden>{children}</div>);
}
