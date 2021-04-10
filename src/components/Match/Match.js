
const Match = ({ match, players, dependenciesAttached}) => {

    const formatDependency = (player) => {
        if (player === 'p1'){
        }
        return 'Hej'
    }

    //const p1 = match.p1Id===0 ? formatDependency('p1'): match.p1Id

    return (
        <div className={'tournament'}>
            <h3>Match id: {match.id} {match.p1Id} vs {match.p2Id}</h3>
        </div>
    )
}

export default Match