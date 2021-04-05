import Header from './Header'
import Draw from './Draw'


const Draws = ({ draws, onDelete, onView }) => {

    return (

        <div>
            <Header title='Draws' />
            {draws.map((draw) => (
                <Draw key={draw.id} draw={draw} onView={onView} onDelete={onDelete} />
            ))}
        </div>
    )
}

export default Draws