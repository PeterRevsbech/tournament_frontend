import Match from './Match'

const Matches = ({matches, players, draws, reloadMatches}) => {

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
                       numOfGames={draws.find((draw) => draw.id===match.drawId).games}
                       reloadMatches={reloadMatches}
                />
            ))}
        </div>
    )
}

export default Matches