import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { FiSearch } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";
import { ModeToggle } from './theme';
import Link from 'next/link';
export default function Navbar() {
  return (
    <header>
      <nav className='backdrop-blur-md '>
        <figure className='relative w-10 h-10'>
            <Image src="/logo.svg" alt="logo" priority fill className='bg-black'/>      
        </figure>
      
        <ul>
            {['Mac','iPad','iPhone','Watch','AirPods','TV & Home','Entertainment','Accessories','Support'].map((item)=>(
                <li key={item} className='nav-link'>
                    <Link href="#">
                        {item}
                    </Link>
                </li>
            ))}
        </ul>

        <div className="flex items-center">
            <Button variant="ghost" size="icon">
                <FiSearch size={18}/>
                
            </Button>
            <Button variant="ghost" size="icon">

                <IoBagHandleOutline size={18}/>
                
            </Button>
            <ModeToggle />
        </div>
      </nav>
    </header>
  )
}
