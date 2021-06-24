import copyImg from './../assets/images/copy.svg'

import './../styles/room-code.scss'

type RoomCodeProps = {
    code: string
}

export const RoomCode = (props: RoomCodeProps) => {

    const copyRoomCodeToClipBoard = () => {
        navigator.clipboard.writeText(props.code)
    }

    return (
        <button className="room-code">
            <div>
                <img src={copyImg} alt="copy room code" />
            </div>
            <span onClick={copyRoomCodeToClipBoard}>Sala #{props.code}</span>
        </button>
    )
}