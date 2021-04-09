import Player from "./Player";

const Players = ({ players, onDelete, onView, title, showViewButton, isUsingSeedings, onSeedingChange }) => {


    return (
        <div>
            <h2>{title}</h2>
            {players.map((player) => (
                <Player
                    key={player.id}
                    player={player}
                    onView={onView}
                    onDelete={onDelete}
                    showViewButton={showViewButton}
                    showSeedingOption={isUsingSeedings}
                    onSeedingChange={onSeedingChange}
                />
            ))}
        </div>
    )
}


Players.defaultProps = {
    title: 'Players',
    showViewButton: true
}
export default Players