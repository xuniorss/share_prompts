'use client'

import { PromptRequestProps } from '@app/api/prompt/route'
import { ProfileComponent } from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'

const fetchPosts = async (userId: string) => {
   const response = await fetch(`/api/users/${userId}/posts`)
   const data: Array<PromptRequestProps> = await response.json()

   return data
}

export default function MyProfile() {
   const [myPosts, setMyPosts] = useState<PromptRequestProps[]>([])

   const { data: session } = useSession()

   const handleEdit = useCallback(() => {}, [])

   const handleDelete = useCallback(async () => {}, [])

   useEffect(() => {
      if (!session) return
      fetchPosts(session.user.id).then((data) => setMyPosts(data))
   }, [session])

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
