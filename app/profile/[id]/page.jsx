"use client"

import {useState,useEffect} from 'react'
import {useSession} from 'next-auth/react'
import {useRouter,useParams} from 'next/navigation'
import Profile from '@components/Profile'

const profile = () => {
    const router=useRouter()
    const params = useParams();
    const {data:session}=useSession()
    const [posts,setPosts]=useState([])
    
    useEffect(() => {
        if (params.id) {
         
        const fetchPosts=async()=>{
          const res=await fetch(`/api/users/${params.id}`)
          const data=await res.json()
          setPosts(data)
          console.log(data,'data')
        }
       if (session?.user) fetchPosts()
       
      }}, [session?.user])
  return (
    <Profile name="My" desc="Welcome to my personalized profile page" data={posts} />
  )
}

export default profile