import { FaTimes } from 'react-icons/fa'
import Button from '../Button'

const Draw = ({ draw, onDelete, onView }) => {
    return (
        <div className={`tournament ${draw.selected ? 'selected' : ''}`}>
            <h3>{draw.name}
                <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(draw.id)} />
            </h3>
            <p>{draw.drawTypeDTO === 0 ? 'Knock-Out': draw.drawTypeDTO === 1 ? 'Monrad' : 'Round Robin'}</p>
            <Button text='View' onClick={() => onView(draw.id)} />
        </div>

    )

}

export default Draw