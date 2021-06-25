import firebase from 'firebase'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import sairImg from './../assets/images/power.png'

import './../styles/logout.scss'

export const Logout = () => {
    const history = useHistory()
    const { setUser } = useAuth()

    const handleLogout = () => {
        firebase.auth().signOut()
        setUser(undefined)
        history.push('/')
    }

    return (
        <div id="logout-power">
            <button onClick={handleLogout}>
                <img src={sairImg} alt="Logout" />
            </button>
        </div>
    )
}