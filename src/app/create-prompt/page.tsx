'use client'

import { Form } from '@components/Form'
import { useSession } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export type PostProps = {
   prompt: string
   tag: string
}

export default function CreatePrompt() {
   const [submitting, setSubmitting] = useState(false)
   const [post, setPost] = useState<PostProps>({ prompt: '', tag: '' })

   const { data: session } = useSession()
   const router = useRouter()

   const createPrompt = async (e: FormEvent) => {
      e.preventDefault()
      setSubmitting(true)

      try {
         const response = await fetch('/api/prompt/new', {
            method: 'POST',
            body: JSON.stringify({
               prompt: post.prompt,
               userId: session?.user.id,
               tag: post.tag,
            }),
         })

         if (response.ok) {
            router.push('/')
         }
      } catch (error) {
         console.error(error)
      } finally {
         setSubmitting(false)
      }
   }

   return (
      <Form
         type="Criar"
         post={post}
         setPost={setPost}
         submitting={submitting}
         handleSubmit={createPrompt}
      />
   )
}
