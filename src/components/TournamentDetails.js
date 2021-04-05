import Header from './Header'
import Draws from './Draws'
import Players from './Players'

const TournamentDetails = ({ selectedTournamentId, tournament }) => {
    console.log(tournament)
    return (

        <div className="container">
            <Header title='Players' />
            <h2>{tournament.name}</h2>

            <Draws />
            <Players />


        </div>
        
    )
}

export default TournamentDetails