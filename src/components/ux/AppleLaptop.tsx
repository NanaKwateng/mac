"use client"

import React from 'react'
import { Canvas } from '@react-three/fiber'
import useMacBookStore from '@/store'
import StudioLights from '../bits/StudioLights'
import Switcher from '../three/Swticher'
import { useMediaQuery } from 'react-responsive'

export default function AppleLaptop() {
    const { scale } = useMacBookStore()
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' })
    
    return (
        <div className="w-full h-[650px] relative flex items-center justify-center ">
            <Canvas 
                id='canvas'
                camera={{
                    position: [0, 0, 5],  // Better position for viewing
                    fov: 45,  // Better FOV for less distortion
                    near: 0.1, 
                    far: 100 
                }}
                shadows
                gl={{ 
                    preserveDrawingBuffer: true, 
                    antialias: true,
                    alpha: true
                }}
            >
                <StudioLights />
                
                {/* Pass the actual scale value */}
                <Switcher scale={scale} isMobile={isMobile}/>
            </Canvas>
        </div>
    )
}