"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { signOut,signIn, useSession, getProviders  } from 'next-auth/react'
const Nav = () => {
    const {data:session}=useSession() 
    const [providers,setProviders]=useState(null)
    const [toggledropdown,setToggleDropdown]=useState(true)
    useEffect(()=>{
        const setProvider=async ()=>{
            const response=await getProviders()
            setProviders(response)
        }
        setProvider()
    },[])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href='/' className='flex gap-2 flex-center'>
        <Image src={session?.user.image}
        alt='logo'
        width={30}
        height={30}
        className='object-contain'
        />
        <p className='logo_text'>Propmtopia</p>
        </Link>
        <div className="sm:flex hidden">
        {session?.user ? (
            <div className='flex gap-3 md:gap-5'>
                <Link href="/create-prompt" className='black_btn'>create post</Link>
                <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
                <Link href="/profile">
                <Image 
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
                />
               </Link>
            </div>
        ):(
            <>
            {providers && Object.values(providers).map((provider)=>(
            <button
            type="button"
            key={provider.name}
            onClick={()=>signIn(provider.id)}
            className='black_btn cursor-pointer'
            >
                Sign In
            </button>
            ))}
            </>
        )}    
         </div>
         <div className='sm:hidden flex relative'>
        {session?.user ? (
            <div className='flex '>
                <Image 
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full cursor-pointer'
                alt='profile'
                onClick={()=>setToggleDropdown((prev)=>!prev)}
                />
                {toggledropdown && (
                    <div className='dropdown'>
                        <Link href="/profile" className='dropdown_link' onClick={()=>setToggleDropdown(false)}>
                        My profile
                        </Link>
                        <Link href="/create-prompt" className='dropdown_link' onClick={()=>setToggleDropdown(false)}>
                        create prompt
                        </Link>
                        <button type='button' onClick={()=>{setToggleDropdown(false); signOut()}} className='mt-5 w-full black_btn'>Sign Out</button>
                    </div>
                )}
            </div>
        ):(
            <>
            {providers && Object.values(providers).map((provider)=>(
            <button
            type="button"
            key={provider.name}
            onClick={()=>signIn(provider.id)}
            className='black_btn cursor-pointer'
            >
                Sign In
            </button>
            ))}
            </>
        )}
   
         </div>
    </nav>
  )
}

export default Nav