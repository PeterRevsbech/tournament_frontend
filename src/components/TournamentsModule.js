import { useState, useEffect } from 'react'
import Tournaments from './Tournaments'
import Header from './Header'
import AddTournament from './AddTournament'
import axios from 'axios'


const TournamentsModule = ({ tournaments, setTournaments, setSelectedTournamentId, api_address }) => {
    const [showAddTournament, setShowAddTournament] = useState(false)


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
    }, [api_address, setTournaments])

  
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


    //Select tournament
    const selectTournament = (id) => {
        setTournaments(
            tournaments.map((tournament) =>
                tournament.id === id ? { ...tournament, selected: true } : { ...tournament, selected: false }
            ))

        setSelectedTournamentId(id)
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
                <Tournaments tournaments={tournaments} onView={selectTournament} onDelete={deleteTournament} />
                : 'No tournaments to show'
            }

        </div>
    )
}

export default TournamentsModule
