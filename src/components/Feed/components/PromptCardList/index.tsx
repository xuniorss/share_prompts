import { PromptRequestProps } from '@app/api/prompt/route'
import { PromptCard } from '@components/PromptCard'

type PromptCardProps = {
   data: Array<PromptRequestProps>
   handleTagClick: (tag: string) => void
}

export const PromptCardList = ({ data, handleTagClick }: PromptCardProps) => {
   return (
      <div className="mt-16 prompt_layout">
         {data.map((post) => (
            <PromptCard
               key={post._id}
               post={post}
               handleTagClick={() => handleTagClick(post.tag)}
            />
         ))}
      </div>
   )
}
