"use client"

import React from 'react'
import { Badge } from '../ui/badge'
import useMacBookStore from '@/store'
import clsx from 'clsx'
import AppleLaptop from './AppleLaptop'

// Configuration objects for better maintainability
const COLORS = [
  { id: 'silver', value: '#adb5bd', name: 'Silver', className: 'bg-neutral-300' },
  { id: 'space-gray', value: '#2e2c2e', name: 'Space Gray', className: 'bg-neutral-900' }
] as const

const SIZES = [
  { inches: 14, scale: 0.06 },
  { inches: 16, scale: 0.08 }
] as const

export default function Laptop() {
  const { color, scale, setColor, setScale } = useMacBookStore()
  
  // Get current color name for display
  const currentColorName = COLORS.find(c => c.value === color)?.name || 'Space Gray'
  
  return (
    <section className='min-h-screen flex flex-col items-center justify-center w-full' id="products-viewer">
      <h2 className="text-3xl font-bold mb-8">Take a closer look</h2>
      
          <AppleLaptop />
          
      <div className="controls space-y-4">
        <p className="text-lg font-medium text-center">
          MacBook {SIZES.find(s => s.scale === scale)?.inches} inches in {currentColorName}
        </p>
        
        <div className="flex items-center justify-center gap-5 mt-5">
          {/* Color Selection */}
          <Badge className="color-controls bg-neutral-400 p-2 flex gap-2">
            {COLORS.map((colorOption) => (
              <Badge 
                key={colorOption.id}
                onClick={() => setColor(colorOption.value)} 
                className={clsx(
                  colorOption.className,
                  'w-8 h-8 cursor-pointer transition-all',
                  color === colorOption.value && 'ring-2 ring-blue-500 ring-offset-2'
                )}
                aria-label={`Select ${colorOption.name} color`}
              />
            ))}
          </Badge>
          
          {/* Size Selection */}
          <Badge className="size-control bg-neutral-400 p-1 flex gap-1">
            {SIZES.map((sizeOption) => (
              <Badge 
                key={sizeOption.inches}
                onClick={() => setScale(sizeOption.scale)} 
                className={clsx(
                  'px-3 py-1 cursor-pointer transition-all',
                  scale === sizeOption.scale 
                    ? "bg-white text-black" 
                    : "bg-transparent text-white hover:bg-white/20"
                )}
              >
                <span>{sizeOption.inches} inches </span>
              </Badge>
            ))}
          </Badge>
        </div>
      </div>
      


    </section>
  )
}