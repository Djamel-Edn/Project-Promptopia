"use client"
import {useState, useEffect} from 'react'
import PromptCard from './PromptCard'
const PromptCardList = ({data, handleTagClick}) => {
  return (

    <div className='mt-16 prompt_layout'>
      {data.map((post) =>(
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />)
      )}
    </div>
  )
}
import React from 'react'

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const handleTagClick = (tag) => {
    setSearchText(tag)
  }
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);

    if (searchText === '') {
      setFilteredPosts(posts.slice(0, 9));
      return;
    }
  };
 useEffect(() => {
  if (!searchText) {
    setFilteredPosts(posts.slice(0, 9));
    return;
  }
  if (!posts){return;}
  const searchValue = searchText.toLowerCase();
  const filteredPosts = posts.filter((post) => {
    if (!post.tag && !post.creator) {
      return false;
    }
    const tagMatch = post.tag?.toLowerCase()?.includes(searchValue);
    const usernameMatch = post.creator?.username?.toLowerCase()?.includes(searchValue);

    return tagMatch || usernameMatch;
  })
    setFilteredPosts(filteredPosts)
  
 }, [searchText])
  useEffect(() => {
    const fetchPosts=async()=>{
      const res=await fetch('/api/Prompt')
      const data=await res.json()
      
      setPosts(data)
      setFilteredPosts(data.slice(0,9))  
    }
    fetchPosts()
  }, [])
  console.log(filteredPosts)
  return (

    <section className='feed'>
      <form className='relative w-full flex-center' onSubmit={handleSearchChange}>
        <input type="text" placeholder='Search for a tag or a username' value={searchText|| ""} onChange={handleSearchChange}  className='search_input peer' />
      </form>
      <PromptCardList data={filteredPosts} handleTagClick={(tag)=>handleTagClick(tag)} />
      </section>
  )
}

export default Feed