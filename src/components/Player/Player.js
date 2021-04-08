import { FaTimes } from 'react-icons/fa'
import Button from '../Button'

const Player = ({ player, onDelete, onView, showViewButton, showSeedingOption }) => {
    return (
        <div className={`tournament ${player.selected ? 'selected' : ''}`}>
            <h3>{player.name}
                <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(player.id)} />
            </h3>
            {showViewButton && <Button text='View' onClick={() => onView(player.id)} />}
            {showSeedingOption && <input type='text' />}
        </div>

    )

}

export default Player