import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { FiSearch } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";
import { ModeToggle } from './theme';
import Link from 'next/link';
import { ButtonGroup } from '../ui/button-group';
export default function Navbar() {
  return (
    <header>
      <nav className='backdrop-blur-md px-5'>
        <figure className='relative w-7 h-7'>
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

        <ButtonGroup>
          <Button variant="outline" size="sm">
            <FiSearch size={18}/>
          </Button>
          <Button variant="outline" size="sm">
            <IoBagHandleOutline size={18}/>
          </Button>         
          {/* <ModeToggle /> */}
      </ButtonGroup>
      </nav>
    </header>
  )
}
