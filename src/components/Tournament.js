import { FaTimes } from 'react-icons/fa'

const Tournament = ({ tournament, onDelete, onToggle}) => {
    return (
        <div className={`tournament ${tournament.reminder ? 'reminder' : ''}`} onClick={() => onToggle(tournament.id)}>
            <h3>{tournament.text}
                <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(tournament.id)} />
            </h3>
            <p>{tournament.day}</p>


        </div>
        
        )

}

export default Tournament