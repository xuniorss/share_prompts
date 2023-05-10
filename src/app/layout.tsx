import { ReactNode } from 'react'
import '@styles/globals.css'
import { Navbar } from '@components/Navbar'
import { Provider } from '@components/Provider'

export const metadata = {
   title: 'Promptopia',
   description: 'Discover & Share AI Prompts',
}

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <html lang="pt-br">
         <body>
            <Provider>
               <div className="main">
                  <div className="gradient" />
               </div>

               <main className="app">
                  <Navbar />
                  {children}
               </main>
            </Provider>
         </body>
      </html>
   )
}
