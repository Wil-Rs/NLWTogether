import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useHistory, useParams } from 'react-router-dom'

import logoImg from './../assets/images/logo.svg'
import deleteImg from './../assets/images/delete.svg'
import checkImg from './../assets/images/check.svg'
import answerImg from './../assets/images/answer.svg'

import './../styles/room.scss'
import { FormEvent, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { useEffect } from 'react'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'
import { Logout } from '../components/Logout'



type RoomParams = {
    id: string
}



export const AdminRoom = () => {

    const [newQuestion, setNewQuestion] = useState('')
    const histoty = useHistory()

    const params = useParams<RoomParams>()
    const roomId = params.id

    const { user } = useAuth()
    const { title, questions } = useRoom(roomId)


    const handleDeleteQuestion = async (questionId: string) => {
        if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
            const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }

    }

    const handleCheckQuestionAnswered = async (questionId: string) => {
        const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        })
    }

    const handleHighlightQuestion = async (questionId: string) => {
        const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighLighted: true
        })
    }

    const handleEndRoom = async () => {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        histoty.push('/');
    }

    const hadleSendQuestion = async (event: FormEvent) => {
        event.preventDefault()

        if (newQuestion.trim() === '') {
            return
        }

        if (!user) {
            throw new Error('You must be logged in')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user?.avatar
            },
            isHighLighted: false,
            isAnsmered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question)
        setNewQuestion('')

    }

    return (
        <div id="page-room">

            <Logout />

            <header>
                <div className="content">
                    <img src={logoImg} alt="" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom} >Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala: {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>



                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighLighted={question.isHighLighted}
                            >

                                {!question.isAnswered && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleCheckQuestionAnswered(question.id)}
                                        >
                                            <img src={checkImg} alt="Marcar perguntas como respondida" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleHighlightQuestion(question.id)}
                                        >
                                            <img src={answerImg} alt="Dar destaque a perguntas" />
                                        </button>
                                    </>
                                )}

                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover perguntas" />
                                </button>

                            </Question>
                        )
                    })}
                </div>

            </main>
        </div>
    )
}