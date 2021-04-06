import Draw from './Draw'


const Draws = ({ draws, onDelete, onView }) => {

    return (

        <div>
            <h2>Draws</h2>
            {draws.map((draw) => (
                <Draw key={draw.id} draw={draw} onView={onView} onDelete={onDelete} />
            ))}
        </div>
    )
}

export default Draws