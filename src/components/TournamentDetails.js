import Header from './Header'
import Draws from './Draws'
import Players from './Players'
import axios from 'axios'
import { useState, useEffect } from 'react'

const TournamentDetails = ({ selectedTournamentId, tournament, api_address }) => {
    console.log(tournament)

    const [draws, setDraws] = useState([
    ])

    const fetchDraw = async (id) => {
        axios({ method: 'get', url: `${api_address + 'Draw/' + id}` })

            .then(res => {
                const draw = res.data;
                console.log('Fetched Draw:')
                console.log(draw)
                setDraws([...draws, draw])
                //return draw
            })

            .catch(function (error) {
                // handle error
                console.log(error);
                return
            });
    }

    useEffect(() => {
        tournament.drawIds.forEach((id) => {
            fetchDraw(id)
        });
    }, [])

    return (

        <div className="container">
            <h2>{tournament.name}</h2>

            <Draws draws={draws} />
            <Players />


        </div>
        
    )
}

export default TournamentDetails