import { useState } from 'react'
import Tournaments from './Tournaments'
import Header from './Header'
import AddTournament from './AddTournament'
import axios from 'axios'
import {api_address} from '../App'


const TournamentsModule = ({ tournaments, setTournaments, setSelectedTournamentId }) => {
    const [showAddTournament, setShowAddTournament] = useState(false)

    //Add Tournament
    const addTournament = (tournament) => {
        tournament.selected = false
        setTournaments([...tournaments, tournament])
    }

    console.log('API ADDRESS:',api_address)


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
