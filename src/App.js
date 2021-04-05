import './App.css';
import { useState } from 'react'
import TournamentDetails from './components/TournamentDetails'
import TournamentsModule from './components/TournamentsModule';

const api_address = 'https://localhost:5001/api/'

function App() {


    const [selectedTournamentId, setSelectedTournamentId] = useState(-1)
    const [tournaments, setTournaments] = useState([
    ])

    return (
        <div>
            <TournamentsModule tournaments={tournaments}
                setTournaments={setTournaments}
                setSelectedTournamentId={setSelectedTournamentId}
                api_address={api_address}
            />

            {selectedTournamentId !== -1 && <TournamentDetails
                tournament={tournaments.find((t) => t.id === selectedTournamentId)}
                api_address={api_address}
            />}
        </div>


      
  );
}

export default App;
