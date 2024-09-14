"use client"
import React, { useEffect } from 'react'
import {useState} from 'react'
import {useSession} from 'next-auth/react'
import { useRouter,useSearchParams } from 'next/navigation';
import Form from '../../components/Form'
const EditPrompt = () => {
    const router = useRouter();
    const {data:session}=useSession()
    const [submitting, setSubmitting] = useState(false)
    const searchParams=useSearchParams()
   const promptId=searchParams.get('id')
    const [post,setPost]=useState({
        prompt:'',
        tag:''
    })
    useEffect(()=>{
        const getPrompt=async()=>{
            const res=await fetch(`/api/Prompt/${promptId}`)
            const data=await res.json()
            setPost({
                prompt:data.prompt,
                tag:data.tag}
            )
        }
        getPrompt()
    },[promptId])
    const EditPrompt=async(e)=>{
      e.preventDefault()
      setSubmitting(true)
      if (!promptId) return
      try{
        const res=await fetch(`/api/Prompt/${promptId}`,{
          method:'PATCH',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({ prompt:post.prompt, tag:post.tag})
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
    type='Edit'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={EditPrompt}
    />
  )
}

export default EditPrompt