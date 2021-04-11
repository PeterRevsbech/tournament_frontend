import { FaTimes } from 'react-icons/fa'
import Button from '../Button'

const Player = ({ player, onDelete, onView, showViewButton, showSeedingOption, onSeedingChange}) => {
    return (
        <div className={`tournament ${player.selected ? 'selected' : ''}`}>
            <h3>{player.name}
                <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(player.id)} />
            </h3>
            {showViewButton && <Button text='View' onClick={() => onView(player.id)} />}
            {showSeedingOption && <h5>Seed</h5>}
            {showSeedingOption && <input type='text' id={player.id} />}

        </div>

    )
}

export default Player