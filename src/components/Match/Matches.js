import Match from './Match'

const Matches = ({matches, dependenciesAttached}) => {

    return (
        <div>
            {matches.map((match) => (
                <Match key={match.id} match={match} dependenciesAttached={dependenciesAttached}/>
            ))}
        </div>
    )
}

export default Matches