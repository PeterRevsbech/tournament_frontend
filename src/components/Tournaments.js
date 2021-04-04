import Tournament from './Tournament'



const Tournaments = ({ tournaments, onDelete, onToggle}) => {

    
    return (
        <>
            {tournaments.map((tournament) => (
                <Tournament key={tournament.id} tournament={tournament} onToggle={onToggle} onDelete={onDelete} />
            ))}
        </>
        )


}

export default Tournaments