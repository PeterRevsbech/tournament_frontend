import './App.css';
import {useEffect, useState} from 'react'
import TournamentDetails from './components/TournamentDetails'
import TournamentsModule from './components/TournamentsModule';
import axios from "axios";

export const api_address = 'https://localhost:5001/api/'

function App() {

    //Tournaments
    const [selectedTournamentId, setSelectedTournamentId] = useState(-1)
    const [tournaments, setTournaments] = useState([])

    //Draws
    const [selectedDrawId, setSelectedDrawId] = useState(-1)
    const [draws, setDraws] = useState([])

    //Players
    const [selectedPlayerId, setSelectedPlayerId] = useState(-1)
    const [players, setPlayers] = useState([])

    useEffect(() => {
        setTournaments([])
        axios({ method: 'get', url: `${api_address + 'Tournament'}` })

            .then(res => {
                const tournaments = res.data;
                console.log('Fetched Tournaments:')
                console.log(tournaments)
                setTournaments(tournaments);
            })

            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, [setTournaments])

    return (
        <div>
            <TournamentsModule tournaments={tournaments}
                setTournaments={setTournaments}
                setSelectedTournamentId={setSelectedTournamentId}
            />

            {selectedTournamentId !== -1 && <TournamentDetails
                tournament={tournaments.find((t) => t.id === selectedTournamentId)}
                draws={draws}
                setDraws={setDraws}
                setSelectedDrawId={setSelectedDrawId}
                players={players}
                setPlayers={setPlayers}
                setSelectedPlayerId={setSelectedPlayerId}
            />}
        </div>


      
  );
}

export default App;
