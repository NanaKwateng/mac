"use client"

import React, { useEffect } from 'react'

export default function HeroVideo() {

    const videoRef = React.useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if(videoRef.current) {
            videoRef.current.playBackRate - 2;
        }
    }, [])

  return (
    <div>
      <video 
            src="/videos/hero.mp4" 
            autoPlay 
            loop 
            muted 
            className='w-full h-auto'
            ref= {videoRef}
        />
    </div>
  )
}
