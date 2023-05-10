'use client'

import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { ReactNode } from 'react'

type ProviderProps = {
   children: ReactNode
   session?: Session
}

export const Provider = ({ children, session }: ProviderProps) => {
   return <SessionProvider session={session}>{children}</SessionProvider>
}
