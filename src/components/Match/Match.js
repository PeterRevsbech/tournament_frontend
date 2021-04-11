
const Match = ({ match, players, drawName}) => {

    const formatDependency = (player) => {
        let dependency
        if (player === 'p1'){
           dependency = match.p1Dependency
        } else {
            dependency = match.p2Dependency
        }

        if (dependency===undefined){
            return
        }
        let text = ''
        if (dependency.position===1){
            text = text + 'winner of'
        } else if (dependency.position===2){
            text = text + 'loser of'
        }

        text = text + ' match ' + dependency.dependencyId

        return text
    }

    const findPlayerName = (playerId) => {
        if (playerId===-1){
            return 'Bye'
        }
        if (players===undefined || players.length===0){
            return playerId
        }
        let soughtPlayer = players.find((player) => player.id===playerId)

        if (soughtPlayer===undefined){
            return playerId
        }
        return soughtPlayer.name
    }

    const formatMatchText = () => {
        let text = 'Id: ' + match.id + '\n\n'
        text += match.p1Id === 0  ? formatDependency('p1') : findPlayerName(match.p1Id)
        text += '\t vs \t'
        text += match.p2Id === 0  ? formatDependency('p2') : findPlayerName(match.p2Id)
        return text
    }

     const status = (statusCode) => {
        switch (statusCode){
            case 0:
                return 'Closed'
            case 1:
                return 'Open'
            case 2:
                return 'Active'
            case 3:
                return 'Finished'
        }
     }


    return (
        <div className={'tournament'}>
            <h4>Match id: {match.id}</h4>
            <h4>Status: {status(match.statusDTO)}</h4>
            <h4>{match.p1Id === 0  ? formatDependency('p1') : findPlayerName(match.p1Id)}</h4>
            <h6>vs</h6>
            <h4>{match.p2Id === 0  ? formatDependency('p2') : findPlayerName(match.p2Id)}</h4>
            <h6>Round: {match.round} of {drawName}</h6>
        </div>
    )
}

export default Match