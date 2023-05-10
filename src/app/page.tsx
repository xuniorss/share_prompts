import { Feed } from '@components/Feed'

export default function Home() {
   return (
      <section className="w-full flex-center flex-col">
         <h1 className="head_text text-center">
            Descubra & Compartilhe
            <br className="max-md:hidden" />
            <span className="orange_gradient text-center">
               {' '}
               AI-Powered Prompts
            </span>
         </h1>
         <p className="desc text-center">
            Promptopia é uma ferramenta de inteligência artificial de código
            aberto para o mundo moderno descobrir, criar e compartilhar prompts
            criativos
         </p>

         <Feed />
      </section>
   )
}
