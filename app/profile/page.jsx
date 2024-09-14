"use client"

import {useState,useEffect} from 'react'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import Profile from '@components/Profile'
const profile = () => {
    const router=useRouter()
    const {data:session}=useSession()
    const [posts,setPosts]=useState([])
    const handleEdit= (post)=>{
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete=(post)=>{
     
 const hasConfirmed=confirm('Are you sure you want to delete this prompt?')
 if (hasConfirmed){
    try{
        fetch(`/api/Prompt/${post._id}`,{
            method:'DELETE'
        })
        setPosts(posts.filter(p=>p._id!==post._id))
    }catch{
        console.error('Failed to delete the prompt')
    }
 }
    }
    useEffect(() => {
        const fetchPosts=async()=>{
          const res=await fetch(`/api/users/${session?.user.id}`)
          const data=await res.json()
          
          setPosts(data)
        }
       if (session?.user) fetchPosts()
       
      }, [session?.user])
  return (
    <Profile name="My" desc="Welcome to your personalized profile page" data={posts} handleEdit={handleEdit} 
    handleDelete={handleDelete}  />
  )
}

export default profile