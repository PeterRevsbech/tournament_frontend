import Match from './Match'

const Matches = ({matches, dependenciesAttached, playerNames}) => {

    return (
        <div>
            {matches.map((match) => (
                <Match key={match.id}
                       match={match}
                       dependenciesAttached={dependenciesAttached}
                       playerNames={playerNames}
                />
            ))}
        </div>
    )
}

export default Matches