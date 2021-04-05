import { FaTimes } from 'react-icons/fa'
import Button from './Button'

const Tournament = ({ tournament, onDelete, onView}) => {
    return (
        <div className={`tournament ${tournament.selected ? 'selected' : ''}`}>
            <h3>{tournament.name}
                <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(tournament.id)} />
            </h3>
            <p>{tournament.startDate}</p>
            <Button text='View' onClick={() => onView(tournament.id) }/>
        </div>
        
        )

}

export default Tournament