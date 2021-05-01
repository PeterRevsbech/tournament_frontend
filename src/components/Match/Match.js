import NumberFormat from 'react-number-format';
import Button from "../Button";
import axios from "axios";
import {api_address} from "../../App";
import {useState} from "react";
const Match = ({ match, players, drawName, drawTypeDTO, usingSets, numOfSets, numOfGames, reloadMatches}) => {

    const [scoreInput, setScoreInput] = useState('')

    const formatDependency = (player) => {
        let dependency
        if (player === 'p1') {
            dependency = match.p1Dependency
        } else {
            dependency = match.p2Dependency
        }

        if (dependency === undefined) {
            return
        }
        let text = ''
        if (dependency.position === 1) {
            text = text + 'winner of'
        } else if (dependency.position === 2) {
            text = text + 'loser of'
        }

        text = text + ' match ' + dependency.dependencyId

        return text
    }

    const findPlayerName = (playerId) => {
        if (playerId === -1) {
            return 'Bye'
        }
        if (players === undefined || players.length === 0) {
            return playerId
        }
        let soughtPlayer = players.find((player) => player.id === playerId)

        if (soughtPlayer === undefined) {
            return playerId
        }
        return soughtPlayer.name
    }

    const status = (statusCode) => {
        switch (statusCode) {
            case 0:
                return 'Closed'
            case 1:
                return 'Open'
            case 2:
                return 'Active'
            case 3:
                return 'Finished'
            default:
                return ""
        }
    }

    const formatPoints = (p1Points, p2Points) => {
        //Figure out which gameSets have actually been played
        var p1Res = '', p2Res = ''
        var i;
        for (i = 0; i < p1Points.length; i++) {
            if (p1Points[i] === 0 && p2Points[i] === 0) {
                break;
            }
            p1Res += p1Points[i] + '\t'
            p2Res += p2Points[i] + '\t'
        }
        return [p1Res, p2Res]

    }

    const formatPointsInputString = () => {
        const p1Initials = String(findPlayerName(match.p1Id)).substring(0, 2);
        const p2Initials = String(findPlayerName(match.p2Id)).substring(0, 2);
        const numOfGameSets = numOfSets === 0 ? numOfGames : numOfGames * numOfSets;
        var format = '';
        var mask = '';
        for (let i = 0; i < numOfGameSets; i++) {
            format += '##/##'
            mask += p1Initials + '/' + p2Initials
            if (i !== numOfGameSets - 1) {
                format += ' '
                mask += ' '
            }
        }
        return [format, mask];
    }

    const reportMatchResult = () => {
        const matchResultDTO = {
            "matchId": match.id,
            "score": scoreInput
        };

        axios({
            method: 'put',
            url: `${api_address}Match/Report`,
            data: matchResultDTO
        })
            .then(res => {
                console.log(res)
                reloadMatches()
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });

    }


    const formattedPoints = formatPoints(match.p1Points, match.p2Points)
    const p1Points = formattedPoints[0]
    const p2Points = formattedPoints[1]


    return (
        <div className={'tournament'}>
            <h4>Match id: {match.id}</h4>
            <h4>Status: {status(match.statusDTO)}</h4>

            <table>
                <tbody>
                <tr>
                    <th>Player</th>
                    <th>Points</th>
                    {usingSets && <th>Sets</th>}
                    <th>Games</th>
                    <th>Result</th>
                </tr>
                <tr>
                    <td>{match.p1Id === 0 ? formatDependency('p1') : findPlayerName(match.p1Id)}</td>
                    <td>{p1Points}</td>
                    {usingSets && <td>{match.p1Sets}</td>}
                    <td>{match.statusDTO === 3 ? match.p1Games : ""}</td>
                    <td>{match.statusDTO === 3 ? (match.p1Won ? 'Winner' : 'Loser') : ""}</td>
                </tr>
                <tr>
                    <td>{match.p2Id === 0 ? formatDependency('p2') : findPlayerName(match.p2Id)}</td>
                    <td>{p2Points}</td>
                    {usingSets && <td>{match.p2Sets}</td>}
                    <td>{match.statusDTO === 3 ? match.p2Games : ""}</td>
                    <td>{match.statusDTO === 3 ? (match.p1Won ? 'Loser' : 'Winner') : ""}</td>
                </tr>
                </tbody>

            </table>

            {(match.statusDTO === 1 || match.statusDTO === 2) &&
            <NumberFormat format={formatPointsInputString()[0]}
                          placeholder={formatPointsInputString()[1]}
                          allowEmptyFormatting
                          mask="_"
                          onValueChange={(values) => {
                              setScoreInput(values.formattedValue)}}
            />
            }

            {(match.statusDTO === 1 || match.statusDTO === 2) && <br/>}
            {(match.statusDTO === 1 || match.statusDTO === 2) &&
            <Button text='Submit result' onClick={reportMatchResult}/>
            }

            {drawTypeDTO !== 2 ? <h6>Round {match.round} of {drawName}</h6> : <h6>{drawName}</h6>}
        </div>
    )
}

export default Match