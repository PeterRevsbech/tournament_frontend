import './App.css';
import { useState } from 'react'
import Tournaments from './components/Tournaments'
import Header from './components/Header'
import AddTournament from './components/AddTournament'



function App() {

    const [showAddTournament,setShowAddTournament] = useState(false)

    const [tournaments, setTournaments] = useState([
        {
            id: 1,
            text: 'Doctors Appointment',
            day: 'Feb 5th at 2:30 pm',
            reminder: true,
        },
        {
            id: 2,
            text: 'Groceries',
            day: 'Feb 6th at 2:30 pm',
            reminder: true,
        },
        {
            id: 3,
            text: 'Workout',
            day: 'Feb 7th at 2:30 pm',
            reminder: true,
        }
    ])

    //Add Tournament
    const addTournament = (tournament) => {
        const id = Math.floor(Math.random() * 10000) + 1
        const newTournament = { id, ...tournament }
        setTournaments([...tournaments, newTournament])
    }


    // Delete Task
    const deleteTournament = (id) => {
        setTournaments(tournaments.filter((tournament) => tournament.id !== id))
    }

    //Toggle Reminder
    const toggleReminder = (id) => {

        setTournaments(
            tournaments.map((tournament) =>
                tournament.id === id ? { ...tournament, reminder: !tournament.reminder } : tournament
        ))
    }

  return (
      <div className="container">
          <Header onAdd={() =>
              setShowAddTournament(!showAddTournament)}
              showAddButton={!showAddTournament}
          />
          {showAddTournament && < AddTournament onAdd={addTournament} />}
          {tournaments.length > 0 ?
              <Tournaments tournaments={tournaments} onToggle={toggleReminder} onDelete={deleteTournament} />
              : 'No tasks to show'
          }
    </div>
  );
}

export default App;
