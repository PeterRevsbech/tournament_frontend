import {useEffect, useState} from 'react'
import axios from 'axios'
import {api_address} from '../../App'
import Matches from "./Matches";


const MatchesModule = ({ matches,
                           setMatches,
                           matchDependencies,
                           setMatchDependencies,
                           selectedDraw,
                           selectedPlayer
}) => {

    const [dependenciesAttached, setDependenciesAttached] = useState(false)

    const getMatchDependencies = () => {
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
    }

    const attachDependecies = () => {
        const getDependency = (id) => {
            matchDependencies.find(md =>
                md.id===id
            )
        }

        matches.map((match) =>
            match.p1DependencyId === null || match.p1DependencyId===0 ? {
            ...match, p1Depedency: getDependency(match.p1DependencyId) }
                : match
        )

        matches.map((match) =>
            match.p2DependencyId === null || match.p2DependencyId===0 ? {
                    ...match, p2Depedency: getDependency(match.p2DependencyId) }
                : match
        )
        setDependenciesAttached(true)
    }

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
                    getMatchDependencies()
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
                <Matches matches={matches}
                    dependenciesAttached={dependenciesAttached}
                />
                : 'No matches in selected draw/for selected player'
            }

        </div>
    )
}

export default MatchesModule
