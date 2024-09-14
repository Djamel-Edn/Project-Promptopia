"use client"
import React from 'react'
import {useState} from 'react'
import {useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation';
import Form from '../../components/Form'
const CreatePrompt = () => {
    const router = useRouter();
    const {data:session}=useSession()
    const [submitting, setSubmitting] = useState(false)
    const [post,setPost]=useState({
        prompt:'',
        tag:''
    })
    const createPrompt=async(e)=>{
      e.preventDefault()
      setSubmitting(true)
      try{
        const res=await fetch('/api/Prompt/new',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({ post, userId: session?.user.id })
        })
        if (res.ok){
          router.push('/')
        }
        console.log(res)
      } catch (error) {
        console.error(error);
      }finally{
        setSubmitting(false)
    }
  }
  return (
    <Form
    type='create'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt