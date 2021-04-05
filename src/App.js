import './App.css';
import { useState, useEffect } from 'react'
import Tournaments from './components/Tournaments'
import Header from './components/Header'
import AddTournament from './components/AddTournament'
import axios from 'axios'

const api_address = 'https://localhost:5001/api/'

function App() {

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
                console.log('Fetched Tournaments:\n'+tournaments)
                setTournaments(tournaments);
            })

            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }


    //Add Tournament
    const addTournament = (tournament) => {
        setTournaments([...tournaments, tournament])
    }


    // Delete Tournament
    /*
    const deleteTournament = async (id) => {
        await fetch(api_address + 'Tournament/' + id, {method: 'DELETE'})
        setTournaments(tournaments.filter((tournament) => tournament.id !== id))
    }
    */

    const deleteTournament = async (id) => {
        axios({ method: 'DELETE', url: `${api_address + 'Tournament/' + id}` })

            .then(res => {
                console.log('Deleted the following\n'+res)
                setTournaments(tournaments.filter((tournament) => tournament.id !== id))
            })

            .catch(function (error) {
                // handle error
                console.log(error);
                alert('Could not delete');
            });
        
    }


    //View Tournament
    const viewTournament = (id) => {
        /*
        setTournaments(
            tournaments.map((tournament) =>
                tournament.id === id ? { ...tournament, reminder: !tournament.reminder } : tournament
        ))
        */
        console.log('Want to view tournament with id:' + id)
    }

  return (
      <div className="container">
          <Header onAdd={() =>
              setShowAddTournament(!showAddTournament)}
              showAddButton={!showAddTournament}
          />
          {showAddTournament && < AddTournament onAdd={addTournament} />}
          {tournaments.length > 0 ?
              <Tournaments tournaments={tournaments} onView={viewTournament} onDelete={deleteTournament} />
              : 'No tournaments to show'
          }
    </div>
  );
}

export default App;
