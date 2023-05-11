'use client'

import { PromptRequestProps } from '@app/api/prompt/route'
import { ProfileComponent } from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

const fetchPosts = async (userId: string) => {
   const response = await fetch(`/api/users/${userId}/posts`)
   const data: Array<PromptRequestProps> = await response.json()

   return data
}

export default function MyProfile() {
   const [myPosts, setMyPosts] = useState<PromptRequestProps[]>([])

   const router = useRouter()

   const { data: session } = useSession()

   useEffect(() => {
      if (!session) return
      fetchPosts(session.user.id).then((data) => setMyPosts(data))
   }, [session])

   const handleEdit = useCallback(
      (post: PromptRequestProps) => {
         router.push(`/update-prompt?id=${post._id}`)
      },
      [router]
   )

   const handleDelete = useCallback(
      async (post: PromptRequestProps) => {
         const hasConfirmation = confirm(
            'Você tem certeza que deseja deletar este prompt ?'
         )

         if (!hasConfirmation) return

         try {
            await fetch(`/api/prompt/${post._id.toString()}`, {
               method: 'DELETE',
            })

            const filteredPosts = myPosts.filter((p) => p._id !== post._id)

            setMyPosts(filteredPosts)
         } catch (error) {
            console.error(error)
         }
      },
      [myPosts]
   )

   return (
      <ProfileComponent
         name="Meu"
         desc="Bem-vindo(a) à sua página de perfil personalizada"
         data={myPosts}
         handleEdit={handleEdit}
         handleDelete={handleDelete}
      />
   )
}
