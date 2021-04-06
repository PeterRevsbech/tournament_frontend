import { FaTimes } from 'react-icons/fa'
import Button from '../Button'

const Player = ({ player, onDelete, onView }) => {
    return (
        <div className={`tournament ${player.selected ? 'selected' : ''}`}>
            <h3>{player.name}
                <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(player.id)} />
            </h3>
            <Button text='View' onClick={() => onView(player.id)} />
        </div>

    )

}

export default Player