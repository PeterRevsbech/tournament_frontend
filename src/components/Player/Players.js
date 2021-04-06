import Player from "./Player";

const Players = ({ players, onDelete, onView }) => {

    return (
        <div>
            <h2>Players</h2>
            {players.map((player) => (
                <Player key={player.id} player={player} onView={onView} onDelete={onDelete} />
            ))}
        </div>
    )
}

export default Players