import Tournament from './Tournament'



const Tournaments = ({ tournaments, onDelete, onView}) => {

    
    return (
        <>
            {tournaments.map((tournament) => (
                <Tournament key={tournament.id} tournament={tournament} onView={onView} onDelete={onDelete} />
            ))}
        </>
        )


}

export default Tournaments