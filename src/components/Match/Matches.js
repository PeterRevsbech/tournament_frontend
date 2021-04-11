import Match from './Match'

const Matches = ({matches, players}) => {

    return (
        <div>
            {matches.map((match) => (
                <Match key={match.id}
                       match={match}
                       players={players}
                />
            ))}
        </div>
    )
}

export default Matches