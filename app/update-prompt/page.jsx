"use client"; // Ensures this page runs as a client component

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '../../components/Form';

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    const getPrompt = async () => {
      if (promptId) {
        try {
          const res = await fetch(`/api/Prompt/${promptId}`);
          const data = await res.json();
          setPost({
            prompt: data.prompt,
            tag: data.tag,
          });
        } catch (error) {
          console.error('Failed to fetch the prompt:', error);
        }
      }
    };
    getPrompt();
  }, [promptId]);

  const EditPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) return;

    try {
      const res = await fetch(`/api/Prompt/${promptId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (res.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to update the prompt:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={EditPrompt}
    />
  );
};

export default EditPrompt;
