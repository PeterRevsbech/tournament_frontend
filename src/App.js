import './App.css';
import { useState, useEffect } from 'react'
import Tournaments from './components/Tournaments'
import Header from './components/Header'
import AddTournament from './components/AddTournament'
import axios from 'axios'
import TournamentDetails from './components/TournamentDetails'

const api_address = 'https://localhost:5001/api/'

function App() {

    //TOURNAMENTS-------------------------------------------------------------------------------------------------------------------------------
    const [selectedTournamentId, setSelectedTournamentId] = useState(-1)

    const [showAddTournament,setShowAddTournament] = useState(false)

    const [tournaments, setTournaments] = useState([
        
    ])

    useEffect(() => {
        fetchTournaments()
        }, [])

    //Fetch tournaments
    const fetchTournaments = async () => {
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
    }


    //Add Tournament
    const addTournament = (tournament) => {
        tournament.selected = false
        setTournaments([...tournaments, tournament])
    }


    // Delete Tournament
    const deleteTournament = async (id) => {
       
        axios({ method: 'DELETE', url: `${api_address + 'Tournament/' + id}` })
            .then(res => {
                console.log('Deleted the following\n')
                console.log(res)
                setTournaments(tournaments.filter((tournament) => tournament.id !== id))
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                alert('Could not delete');
            });
    }


    //View Tournament
    const selectTournament = (id) => {
        setTournaments(
            tournaments.map((tournament) =>
                tournament.id === id ? { ...tournament, selected: true } : { ...tournament, selected: false}
            ))

        setSelectedTournamentId(id)
        console.log('Want to view tournament with id:' + id)

    }
    //PLAYERS------------------------------------------------------------------------------------------------------------------------------------------








    //RETURN------------------------------------------------------------------------------------------------------------------------------------------



    return (
        <div>
            <div className="container">

                <Header onAdd={() =>
                    setShowAddTournament(!showAddTournament)}
                    showAddButton={!showAddTournament}
                />
                {showAddTournament && < AddTournament onAdd={addTournament} />}
                {tournaments.length > 0 ?
                    <Tournaments tournaments={tournaments} onView={selectTournament} onDelete={deleteTournament} />
                    : 'No tournaments to show'
                }

            </div>

            <div className="container">
                <Header title = 'Players'/>
                {selectedTournamentId !== -1 && <TournamentDetails tournament={tournaments.find((t) => t.id === selectedTournamentId)} />}
            </div>
        </div>


      
  );
}

export default App;
