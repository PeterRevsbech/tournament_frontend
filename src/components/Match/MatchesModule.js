import {useEffect, useState} from 'react'
import axios from 'axios'
import {api_address} from '../../App'
import Matches from "./Matches";


const MatchesModule = ({ matches,
                           setMatches,
                           matchDependencies,
                           setMatchDependencies,
                           selectedDraw,
                           selectedPlayer,
                           players,
                           draws

}) => {

    const [matchesWithDeps, setMatchesWithDeps] = useState([])

    //Get dependencies
    useEffect(() => {
        setMatchDependencies([])
        let tmpMDs = [];
        let mdsRemaining = matches.length*2;
        const fetchDependency = (depId) => {
            axios({ method: 'get', url: `${api_address + 'MatchDependency/' + depId}` })

                .then(res => {
                    console.log('Fetched md with id' ,depId)
                    const matchDependency = res.data;
                    tmpMDs = [...tmpMDs, matchDependency]
                    decreaseMdsRemaining()

                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        }

        const decreaseMdsRemaining = () => {
            mdsRemaining--;
            if (mdsRemaining===0){
                // eslint-disable-next-line react-hooks/exhaustive-deps
                matchDependencies = tmpMDs
                setMatchDependencies(matchDependencies)
                attachDependencies()
            }
        }

        matches.forEach((match) => {
            //First for p1
            if (match.p1DependencyId === null || match.p1DependencyId===0){
                decreaseMdsRemaining()
            } else {
                fetchDependency(match.p1DependencyId)
            }

            //Then for p2
            if (match.p2DependencyId === null || match.p2DependencyId===0){
                decreaseMdsRemaining()
            } else {
                fetchDependency(match.p2DependencyId)
            }
        })


    }, [matches])


    //Attach dependencies
    const attachDependencies = () => {
        const getDependency = (id) => {
            return matchDependencies.find(md =>
                md.id===id
            )
        }

        const tmpMatches = Array.from(matches)
        tmpMatches.forEach((match) => {
            if (match.p1DependencyId !== undefined && match.p1DependencyId!==0){
                match.p1Dependency =getDependency(match.p1DependencyId)
            }

            if (match.p2DependencyId !== undefined && match.p2DependencyId!==0){
                match.p2Dependency =getDependency(match.p2DependencyId)
            }
        })

        setMatchesWithDeps(tmpMatches)
    }

    //Get matches
    useEffect(() => {
        setMatches([])
        if (selectedPlayer===undefined && selectedDraw===undefined){
            return
        }

        let url
        if (selectedDraw === undefined){
            url = `${api_address + 'Match/Player/' + selectedPlayer.id}`
        } else {
            url = `${api_address + 'Match/Draw/' + selectedDraw.id}`
        }

        axios({ method: 'get', url: url })
            .then(res => {
                const matches = res.data
                setMatches(matches);
                console.log('Fetched Matches:',matches)
            })

            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, [selectedDraw,selectedPlayer])

    const getPlayerDrawName = () => {
        if (selectedPlayer===undefined && selectedDraw===undefined){
            return ''
        } else if (selectedPlayer!==undefined){
            return selectedPlayer.name
        } else {
            return selectedDraw.name
        }
    }

    return (
        <div className="container">

            {selectedPlayer===undefined ? <h3>Matches in draw:</h3> : <h3>Matches for player:</h3> }
            <h1>{getPlayerDrawName()}</h1>

            {matches.length > 0 ?
                <Matches matches={matchesWithDeps}
                         players={players}
                         draws={draws}
                />
                : 'No matches to display'
            }
        </div>
    )
}

export default MatchesModule
