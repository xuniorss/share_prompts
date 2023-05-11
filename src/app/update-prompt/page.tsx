'use client'

import { PromptRequestProps } from '@app/api/prompt/route'
import { PostProps } from '@app/create-prompt/page'
import { Form } from '@components/Form'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useCallback, useEffect, useState } from 'react'

const getPromptDetails = async (promptId: string) => {
   const response = await fetch(`api/prompt/${promptId}`)
   const data: PromptRequestProps = await response.json()

   return data
}

export default function UpdatePrompt() {
   const [post, setPost] = useState<PostProps>({ prompt: '', tag: '' })
   const [submitting, setSubmitting] = useState(false)

   const router = useRouter()
   const searchParams = useSearchParams()
   const promptId = searchParams.get('id') as string

   useEffect(() => {
      if (!promptId) return

      getPromptDetails(promptId).then((post) =>
         setPost({ prompt: post.prompt, tag: post.tag })
      )
   }, [promptId])

   const updatePrompt = useCallback(
      async (e: FormEvent) => {
         e.preventDefault()
         setSubmitting(true)

         if (!promptId) return alert('Prompt ID not found')

         try {
            const response = await fetch(`/api/prompt/${promptId}`, {
               method: 'PATCH',
               body: JSON.stringify({
                  prompt: post.prompt,
                  tag: post.tag,
               }),
            })

            if (response.ok) router.push('/')
         } catch (error) {
            console.error(error)
         } finally {
            setSubmitting(false)
         }
      },
      [post.prompt, post.tag, promptId, router]
   )

   return (
      <Form
         type="Editar"
         post={post}
         setPost={setPost}
         submitting={submitting}
         handleSubmit={updatePrompt}
      />
   )
}
