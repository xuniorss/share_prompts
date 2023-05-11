'use client'

import { PromptRequestProps } from '@app/api/prompt/route'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { PromptCardList } from './components/PromptCardList'

const fetchPosts = async () => {
   const response = await fetch('api/prompt')
   const data: Array<PromptRequestProps> = await response.json()

   return data
}

export const Feed = () => {
   const [searchText, setSearchText] = useState('')
   const [posts, setPosts] = useState<PromptRequestProps[]>([])

   const handleSearchChange = useCallback((e: ChangeEvent) => {}, [])

   useEffect(() => {
      fetchPosts().then((data) => setPosts(data))
   }, [])

   return (
      <section className="feed">
         <form className="relative w-full flex-center">
            <input
               type="text"
               placeholder="Busque por uma tag ou um nome de usuário"
               value={searchText}
               onChange={handleSearchChange}
               required
               className="search_input peer"
            />
         </form>

         <PromptCardList data={posts} handleTagClick={() => {}} />
      </section>
   )
}
