import Player from "./Player";

const Players = ({ players, onDelete, onView, title, showViewButton, isUsingSeedings, onSeedingChange,hideSelection }) => {


    return (
        <div>
            <h2>{title}</h2>
            {players.map((player) => (
                <Player
                    hideSelection={hideSelection}
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
    hideSelection: false,
    title: 'Players',
    showViewButton: true
}
export default Players