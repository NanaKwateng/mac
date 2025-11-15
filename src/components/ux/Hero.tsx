import Image from 'next/image'
import React from 'react'
import HeroVideo from '../bits/HeroVideo'
import { Button } from '../ui/button'

export default function Hero() {
  return (
    <section className='min-h-screen flex flex-col items-center justify-center gap-8'>
       
        <Image 
            src="/title.png"
            alt='hero title'
            priority
            width={600}
            height={400} 
            className='object-center'
        /> 

        <HeroVideo />
        

        <Button>
            Buy
        </Button>
    </section>
  )
}
