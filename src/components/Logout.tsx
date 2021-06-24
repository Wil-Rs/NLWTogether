import firebase from 'firebase'
import { useHistory } from 'react-router-dom'
import sairImg from './../assets/images/power.png'

import './../styles/logout.scss'

export const Logout = () => {
    const history = useHistory()

    const handleLogout = () => {
        firebase.auth().signOut()
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