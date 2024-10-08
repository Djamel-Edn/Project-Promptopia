"use client"

import {useState,useEffect} from 'react'
import {useSession} from 'next-auth/react'
import {useParams} from 'next/navigation'
import Profile from '@components/Profile'

const ProfilePage = () => {
   
    const params = useParams();
    const {data:session}=useSession()
    const [posts,setPosts]=useState([])

    useEffect(() => {
      if (params.id){

        const fetchPosts=async()=>{
          const res=await fetch(`/api/users/${params.id}`)
          const data=await res.json()
          setPosts(data)
       
        }
        fetchPosts()
      } 
      }, [params?.id])
  return (
    <Profile name="My" desc="Welcome to my personalised profile page" data={posts} />
  )
}

export default ProfilePage