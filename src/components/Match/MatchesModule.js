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
                           players: players
}) => {

    const [dependenciesAttached, setDependenciesAttached] = useState(false)
    const [matchesWithDeps, setMatchesWithDeps] = useState([])

    //Get dependencies
    useEffect(() => {
        console.log('started fetching dependencies');
        setMatchDependencies([])
        let tmpMDs = [];
        let mdsRemaining = matches.length*2;
        const fetchDependency = (depId) => {
            console.log('About to fetch md with id' ,depId);
            axios({ method: 'get', url: `${api_address + 'MatchDependency/' + depId}` })

                .then(res => {
                    const matchDependency = res.data;
                    tmpMDs = [...tmpMDs, matchDependency]
                    mdsRemaining--;
                    if (mdsRemaining===0){
                        matchDependencies = tmpMDs
                        setMatchDependencies(matchDependencies)
                        attachDependecies()
                        //setFinishedFetching(true)
                        //console.log('finishedfetching should be true:' ,finishedFetching);
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        }
        matches.forEach((match) => {
            //First for p1
            if (match.p1DependencyId === null || match.p1DependencyId===0){
                mdsRemaining--
            } else {
                fetchDependency(match.p1DependencyId)
            }

            //Then for p2
            if (match.p2DependencyId === null || match.p2DependencyId===0){
                mdsRemaining--
            } else {
                fetchDependency(match.p2DependencyId)
            }
        })
    }, [matches])


    //Attach dependencies
    const attachDependecies = () => {
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
        setDependenciesAttached(true)
    }

    //Get matches
    useEffect(() => {
        setMatches([])
        if (!selectedPlayer && !selectedDraw){
            return
        }

        if (selectedDraw){
            axios({ method: 'get', url: `${api_address + 'Match/Draw/' + selectedDraw.id}` })

                .then(res => {
                    const matches = res.data
                    setMatches(matches);
                    console.log('Fetched Matches:',matches)
                    setDependenciesAttached(false)
                    //getMatchDependencies(matches.length)
                })

                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        } else {
            axios({ method: 'get', url: `${api_address + 'Match/Player/' + selectedPlayer.id}` })

                .then(res => {
                    setMatches(res.data);
                    console.log('Fetched Matches:',matches)
                })

                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        }
    }, [selectedDraw,selectedPlayer])

    return (
        <div className="container">

            <h1>Viewing matches in:</h1>

            {matches.length > 0 ?
                <Matches matches={matchesWithDeps}
                    dependenciesAttached={dependenciesAttached}
                    players={players}
                />
                : 'No matches in selected draw/for selected player'
            }

        </div>
    )
}

export default MatchesModule
