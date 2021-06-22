import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { auth, firebase } from './../services/firebase'

import illustration from './../assets/images/illustration.svg'
import logoImg from './../assets/images/logo.svg'
import googleIconImg from './../assets/images/google-icon.svg'

import './../styles/auth.scss'
import { Button } from '../components/Button'
import { AuthContext } from '../contexts/AuthContext'
import { useAuth } from '../hooks/useAuth'

export const Home = () => {
    const histoty = useHistory() 
    const { user, signinWithGoogle } = useAuth()

    const handleCreateRoom = async () => {
        
        if(!user) {
            await signinWithGoogle()
        }

        histoty.push('/rooms/new')
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustration} alt="ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>   

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separetor">ou entre em uma sala</div>
                    <form>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                        />

                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>

        </div>
    )
}