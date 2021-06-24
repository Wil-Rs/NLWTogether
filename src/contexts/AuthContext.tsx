import { createContext, ReactNode, useEffect, useState } from "react"
import { FunctionTypeNode } from "typescript"
import { firebase, auth } from "../services/firebase"

type User = {
  id: string
  name: string
  avatar: string
}

type AuthContextType = {
  user: User | undefined;
  signinWithGoogle: () => Promise<void>
  
}

export const AuthContext = createContext({} as AuthContextType)

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContextProvider = (props: AuthContextProviderProps) => {


  const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })

      }
    })

    return () => {
      unsubscribe()
    }

  }, [])

  const signinWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    const result = await auth.signInWithPopup(provider)

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Acconunt')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })

    }
  }


  return (
    <AuthContext.Provider value={{ user, signinWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}