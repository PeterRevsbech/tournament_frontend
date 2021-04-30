import Match from './Match'

const Matches = ({matches, players, draws}) => {

    matches.sort(function(a,b){
        if (a.drawId>b.drawId) return -1
        else if (a.drawId<b.drawId) return 1
        else if (a.round>b.round) return -1
        else if (a.round<b.round) return 1
        else return 0
    }).reverse()
    //let groupedMatches = matches.groupBy()



    return (
        <div>
            {matches.map((match) => (
                <Match key={match.id}
                       match={match}
                       players={players}
                       drawName = {draws.find((draw) => draw.id===match.drawId).name}
                       drawTypeDTO = {draws.find((draw) => draw.id===match.drawId).drawTypeDTO}
                       usingSets = {draws.find((draw) => draw.id===match.drawId).sets !== 0}
                />
            ))}
        </div>
    )
}

export default Matches