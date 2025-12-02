import '@/styles/globals.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps }){
  useEffect(()=>{
    const id = 'lottie-player-script';
    if(!document.getElementById(id)){
      const s = document.createElement('script');
      s.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
      s.id = id;
      s.async = true;
      document.body.appendChild(s);
    }
  },[]);
  return <Component {...pageProps} />
}
