"use client"
import React from 'react'
import {useState} from 'react'
import {useSession} from 'next-auth/react'
import Image from 'next/image'
import {usePathname,useRouter} from 'next/navigation'
import Link from 'next/link'
import Tick from '@styles/assets/icons/tick'
import Copy from '@styles/assets/icons/copy'
const PromptCard = ({post,handleTagClick,handleEdit,handleDelete}) => {
  const [copied, setCopied] = useState('')
  const {data:session}=useSession()
  const pathname=usePathname()
  const router=useRouter()
  const handleCopy=()=>{
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(()=>setCopied(""),10000)
  }
  
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <Link href={`/profile/${post.creator._id}`} className='flex-1 flex justify-start items-center gap-3 cursor-pointer' >
          <Image src={post?.creator?.image} alt='user_image' width={40} height={40} className='rounded-full object-contain'/>
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username}</h3>
            <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>
          </div>
        </Link>
        <div className='copy_btn' onClick={handleCopy}>
          {copied===post.prompt ? (
            <Tick alt='copy' width={15} height={15}/>
          ):(
            <Copy alt='copy' width={15} height={15}/>
          )}
          
        </div>
      </div>
          <p className='my-4 font-satoshi text-sm text-gray-900'>{post.prompt}</p>
          <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={()=>handleTagClick && handleTagClick(post.tag)}>{post.tag}</p>
         { session?.user.id===post.creator._id && pathname==='/profile' &&(
          <div className='mt-5 gap-4 flex-center border-t border-gray-100 pt-3'>
            <p className='font-inter text-sm green_gradient cursor-pointer' onClick={handleEdit}>Edit</p>
            <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={handleDelete}>Delete</p>
          </div>
         ) }
    </div>
  )
}

export default PromptCard