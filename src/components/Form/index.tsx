import { PostProps } from '@app/create-prompt/page'
import Link from 'next/link'
import { Dispatch, FormEventHandler, SetStateAction } from 'react'

type FormProps = {
   type: 'Criar' | 'Editar'
   post: PostProps
   setPost: Dispatch<SetStateAction<PostProps>>
   submitting: boolean
   handleSubmit: FormEventHandler<HTMLFormElement>
}

export const Form = ({
   type,
   post,
   setPost,
   submitting,
   handleSubmit,
}: FormProps) => {
   return (
      <section className="w-full max-w-full flex-start flex-col">
         <h1 className="head_text text-left">
            <span className="blue_gradient">{type} Post</span>
         </h1>
         <p className="desc text-left max-w-md">
            {type} e compartilhar prompts incríveis com o mundo e deixe sua
            imaginação correr solta com qualquer plataforma com inteligência
            artificial.
         </p>

         <form
            onSubmit={handleSubmit}
            className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
         >
            <label>
               <span className="font-satoshi font-semibold text-base text-gray-700">
                  Sua AI Prompt
               </span>

               <textarea
                  value={post.prompt}
                  onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                  placeholder="Escreva seu prompt aqui..."
                  className="form_textarea"
                  required
               />
            </label>

            <label>
               <span className="font-satoshi font-semibold text-base text-gray-700">
                  Tag{' '}
                  <span className="font-normal">
                     (#product, #webdevelopment, #idea)
                  </span>
               </span>

               <input
                  value={post.tag}
                  onChange={(e) => setPost({ ...post, tag: e.target.value })}
                  placeholder="#tag"
                  className="form_input"
                  required
               />
            </label>

            <div className="flex-end mx-3 mb-5 gap-4">
               <Link href="/" className="text-gray-500 text-sm">
                  Cancelar
               </Link>

               <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-1.5 bg-primary-orange rounded-full text-white"
               >
                  {submitting ? `${type}...` : type}
               </button>
            </div>
         </form>
      </section>
   )
}
