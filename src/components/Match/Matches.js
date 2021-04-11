import Match from './Match'

const Matches = ({matches, dependenciesAttached, players}) => {

    return (
        <div>
            {matches.map((match) => (
                <Match key={match.id}
                       match={match}
                       dependenciesAttached={dependenciesAttached}
                       players={players}
                />
            ))}
        </div>
    )
}

export default Matches