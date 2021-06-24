import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"

type QuestionType = {
    id: string
    author: {
        name: string
        avatar: string
    }
    content: string
    isHignlighted: boolean
    isAnswered: boolean
    likeCount: number
    likeId: string | undefined
}

type FireBaseQuestion = Record<string, {
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isAnsmered: boolean,
    isHignlighted: boolean
    likes: Record<string, {
        authorId: string
    }>
}>


export const useRoom = (roomId: string) => {
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('')
    const { user } = useAuth()


    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.on('value', room => {
            const databaseRoom = room.val()
            const firebaseQuestion: FireBaseQuestion = databaseRoom.questions ?? {};

            const parseQuestions = Object.entries(firebaseQuestion).map(([key, value]) => {
                return {
                    id: key,
                    author: value.author,
                    content: value.content,
                    isHignlighted: value.isHignlighted,
                    isAnswered: value.isAnsmered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find( ([key, like]) => like.authorId === user?.id )?.[0]
                }
            })

            setTitle(databaseRoom.title)
            console.log(parseQuestions)
            setQuestions(parseQuestions)
        })

        return () => {
            roomRef.off('value')
        }


    }, [roomId, user?.id])

    return { questions, title }

}