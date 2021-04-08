import Draws from './Draw/Draws'
import Players from './Player/Players'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {api_address} from '../App'
import Header from "./Header";
import AddDraw from "./Draw/AddDraw";
import AddPlayer from "./Player/AddPlayer";



const TournamentDetails = ({ tournament, draws, setDraws, setSelectedDrawId, players, setPlayers ,setSelectedPlayerId }) => {



    //Add Draw
    const [showAddDraw, setShowAddDraw] = useState(false)
    const addDraw = (draw) => {
        draw.selected = false
        setDraws([...draws, draw])
    }

    //Add Player
    const [showAddPlayer, setShowAddPlayer] = useState(false)
    const addPlayer = (player) => {
        player.selected = false
        setPlayers([...players, player])
    }


    //Select draw
    const onSelectDraw = (id) => {
        setDraws(
            draws.map((draw) =>
                draw.id === id ? { ...draw, selected: true } : { ...draw, selected: false }
            ))

        setSelectedDrawId(id)
        console.log('Want to view draw with id:' + id)
    }

    //Delete Draw
    const onDeleteDraw = async (id) => {

        axios({ method: 'DELETE', url: `${api_address + 'Draw/' + id}` })
            .then(res => {
                console.log('Deleted the following\n')
                console.log(res)
                setDraws(draws.filter((draw) => draw.id !== id))
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                alert('Could not delete');
            });
    }

    //Select Player
    const onSelectPlayer = (id) => {
        setPlayers(
            players.map((player) =>
                player.id === id ? { ...player, selected: true } : { ...player, selected: false }
            ))

        setSelectedPlayerId(id)
        console.log('Want to view player with id:' + id)
    }

    //Delete Player
    const onDeletePlayer = async (id) => {

        axios({ method: 'DELETE', url: `${api_address + 'Player/' + id}` })
            .then(res => {
                console.log('Deleted the following\n')
                console.log(res)
                setPlayers(players.filter((player) => player.id !== id))
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                alert('Could not delete');
            });
    }


    //Get draws
    useEffect(() => {
        setDraws([])
        var tempDraws = []
        var drawsRemaining = tournament.drawIds.length

        tournament.drawIds.forEach((id) => {
            axios({ method: 'get', url: `${api_address + 'Draw/' + id}` })

                .then(res => {
                    const draw = res.data;
                    tempDraws = [...tempDraws, draw]
                    drawsRemaining--;
                    if (drawsRemaining===0){
                        setDraws(tempDraws)
                    }
                })

                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        });
    }, [tournament,setDraws])

    //Get players
    useEffect(() => {
        setPlayers([])
        var tempPlayers = []
        var playersRemaining = tournament.playerIds.length

        tournament.playerIds.forEach((id) => {
            axios({ method: 'get', url: `${api_address + 'Player/' + id}` })

                .then(res => {
                    const player = res.data;
                    tempPlayers = [...tempPlayers, player]
                    playersRemaining--
                    if (playersRemaining===0){
                        setPlayers(tempPlayers)
                    }
                })

                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        });
    }, [tournament,setPlayers])



    const playerNameTaken = (proposedName) => {
        var namesAreEqual = false;
        players.forEach((player) => {
            if (player.name.trim().toLowerCase() === proposedName.trim().toLowerCase()) {
                namesAreEqual = true;
            }
        })

        return namesAreEqual
    }

    const drawNameTaken = (proposedName) => {
        var namesAreEqual = false;
        draws.forEach((draw) => {
            if (draw.name.trim().toLowerCase() === proposedName.trim().toLowerCase()) {
                namesAreEqual = true;
            }
        })

        return namesAreEqual
    }


    return (

        <div className="container">
            <h1>{tournament.name}</h1>

            <Header title={'Draws'}
                    onAdd={() =>
                        setShowAddDraw(!showAddDraw)}
                    showAddButton={!showAddDraw}
            />
            {showAddDraw && < AddDraw onAdd={addDraw} nameTaken={drawNameTaken} tournament={tournament} players={players}/>}
            <Draws draws={draws} onView={onSelectDraw} onDelete={onDeleteDraw}/>

            <Header title={'Players'}
                    onAdd={() =>
                        setShowAddPlayer(!showAddPlayer)}
                    showAddButton={!showAddPlayer}
            />
            {showAddPlayer && < AddPlayer onAdd={addPlayer} nameTaken={playerNameTaken} tournament={tournament}/>}
            <Players players={players} onView={onSelectPlayer} onDelete={onDeletePlayer}/>
        </div>
        
    )
}

export default TournamentDetails