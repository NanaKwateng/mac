"use client"
import { PresentationControls } from '@react-three/drei'
import React, { useRef, useLayoutEffect, useState } from 'react'
import MacBookModel14 from '../model/Macbook-14'
import MacBookModel16 from '../model/Macbook-16'
import gsap from 'gsap'
import { useGsap } from '@/hooks/useGsap'
import * as THREE from 'three'

const ANIMATION_DURATION = 1.2  // Slightly longer for smoother fade
const OFFSET_DISTANCE = 20  // Further off-screen

// Helper to set initial opacity
const setMeshOpacity = (group, opacity) => {
    if(!group) return
    
    group.traverse((child) => {
        if(child.isMesh && child.material) {
            // Clone material to avoid conflicts
            child.material = child.material.clone()
            child.material.transparent = true
            child.material.opacity = opacity
            child.material.needsUpdate = true
        }
    })
}

const fadeMeshes = (group, targetOpacity, delay = 0) => {
    if(!group) return

    group.traverse((child) => {
        if(child.isMesh && child.material) {
            child.material.transparent = true
            gsap.to(child.material, { 
                opacity: targetOpacity, 
                duration: ANIMATION_DURATION,
                delay: delay,
                ease: "power2.inOut",
                overwrite: 'auto' // Prevent animation conflicts
            })
        }
    })
}

const moveGroup = (group, x, delay = 0) => {
    if(!group) return

    gsap.to(group.position, {
        x, 
        duration: ANIMATION_DURATION,
        delay: delay,
        ease: "power3.inOut",
        overwrite: 'auto' // Prevent animation conflicts
    })
}

export default function Swticher({scale, isMobile}) {
    const smallMacbookRef = useRef(null)
    const largeMacbookRef = useRef(null)
    const isInitialized = useRef(false)
    const [isAnimating, setIsAnimating] = useState(false)

    // Check if we should show 16" model (scale 0.08) or 14" model (scale 0.06)
    const showLargeMacbook = scale === 0.08

    // Initialize positions and opacity on first render
    useLayoutEffect(() => {
        if (!isInitialized.current && smallMacbookRef.current && largeMacbookRef.current) {
            // Set initial positions
            if (showLargeMacbook) {
                largeMacbookRef.current.position.x = 0
                smallMacbookRef.current.position.x = OFFSET_DISTANCE
                setMeshOpacity(largeMacbookRef.current, 1)
                setMeshOpacity(smallMacbookRef.current, 0)
            } else {
                smallMacbookRef.current.position.x = 0
                largeMacbookRef.current.position.x = OFFSET_DISTANCE
                setMeshOpacity(smallMacbookRef.current, 1)
                setMeshOpacity(largeMacbookRef.current, 0)
            }
            isInitialized.current = true
        }
    }, [])

    // GSAP animations for transitions
    useGsap(() => {
        // Skip if refs not ready or not initialized
        if (!smallMacbookRef.current || !largeMacbookRef.current || !isInitialized.current) return
        if (isAnimating) return // Prevent overlapping animations

        setIsAnimating(true)

        if(showLargeMacbook) {
            // Fade out current model first
            fadeMeshes(smallMacbookRef.current, 0, 0)
            
            // Move models with slight delay for smoother transition
            setTimeout(() => {
                moveGroup(smallMacbookRef.current, OFFSET_DISTANCE, 0)
                moveGroup(largeMacbookRef.current, 0, 0.1)
                
                // Fade in new model
                fadeMeshes(largeMacbookRef.current, 1, 0.2)
            }, 200)
        } else {
            // Fade out current model first
            fadeMeshes(largeMacbookRef.current, 0, 0)
            
            // Move models with slight delay for smoother transition
            setTimeout(() => {
                moveGroup(smallMacbookRef.current, 0, 0)
                moveGroup(largeMacbookRef.current, OFFSET_DISTANCE, 0.1)
                
                // Fade in new model
                fadeMeshes(smallMacbookRef.current, 1, 0.2)
            }, 200)
        }

        // Reset animation flag
        setTimeout(() => {
            setIsAnimating(false)
        }, ANIMATION_DURATION * 1000 + 500)

    }, [scale, showLargeMacbook])

    // Fixed controls configuration - removed conflicting settings
    const controlsConfig = {
        global: false, // Changed to false to prevent conflicts
        snap: false, // Disabled snap to prevent model disappearing
        config: { mass: 2, tension: 250, friction: 30 },
        polar: [-Math.PI, Math.PI / 8], // Reduced range for better control
        speed: 1,
       azimuth: [-Infinity, Infinity], // Reduced range for better control
        rotation: [0, 0, 0], // Start with neutral rotation
        enabled: !isAnimating // Disable controls during animation
    }

    // Scale adjustments for mobile
    const modelScale14 = isMobile ? 0.03 : 0.06
    const modelScale16 = isMobile ? 0.05 : 0.08

    return (
        <>
            {/* 16 inch MacBook */}
            <PresentationControls {...controlsConfig}>
                <group ref={largeMacbookRef}>
                    <MacBookModel16 scale={modelScale16}/>
                </group>
            </PresentationControls>
            
            {/* 14 inch MacBook */}
            <PresentationControls {...controlsConfig}>
                <group ref={smallMacbookRef}>
                    <MacBookModel14 scale={modelScale14}/>
                </group>
            </PresentationControls>
        </>
    )
}