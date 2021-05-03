import {useEffect, useState} from 'react'
import axios from 'axios'
import {api_address} from "../../App";
import Players from "../Player/Players";
import Button from "../Button";

const AddDraw = ({ onAdd, tournament, nameTaken, players  }) => {
    const [name, setName] = useState('')
    const [type, setType] = useState('0')
    const [games, setGames] = useState(5)
    const [points, setPoints] = useState(11)
    const [tieBreaks, setTieBreaks] = useState(false)
    const [playersInDraw, setPlayersInDraw] = useState(Array.from(players))
    const [playerSeedPoints, setPlayerSeedPoints] = useState(Array.from(players).map(player=>[player.id,0]))

    const [useSeedings, setUseSeedings] = useState(true)


    const seedPoints = (id) => {
        return playerSeedPoints.find(element => element[0]===id) === undefined ? 0 : playerSeedPoints.find(element => element[0]===id)[1];
    }

    const submitToAPI = (e) => {

        e.preventDefault();
        console.log(type)

        const playerIds = playersInDraw.map(
            player=>player.id
        )

        const playerIdsSeeded = playerIds.sort((a,b) =>  seedPoints(b)-seedPoints(a))


        const drawCreationDTO = {
            "name": name,
            "drawTypeDTO":type,
            "tournamentId": tournament.id,
            "playerIds":playerIds ,
            "playerIdsSeeded":playerIdsSeeded ,
            "sets": 0,
            "games": games,
            "points": points,
            "tiebreaks": tieBreaks
        };

        axios({
            method: 'post',
            url: `${api_address}Draw/Generate/`,
            data: drawCreationDTO
        })
            .then(res => {
                onAdd(res.data)
                console.log(res.data);
                tournament.drawIds.push(res.data.id)

                //Clear fields
                setName('')
                setGames(0)
                setPoints(0)
                setTieBreaks(false)


            })
            .catch(function (error) {
                // handle error
                alert("Could not submit the draw.")
                console.log(error);
            });
    }

    const onSubmit = (e) => {
        e.preventDefault()


        if (!name) {
            alert('Please add a name for the draw')
            return
        } else if (type === '') {
            alert('Please select a type for the draw')
            return
        } else if (nameTaken(name)){
            alert('The proposed name is already in use for this tournament')
            return
        } else if (games === 0){
            alert('Select a number of games')
            return
        } else if (points === 0){
            alert('Select a number of points')
            return
        }

        if (playersInDraw.length===0){
            alert('There are no players in the draw')
        }

        //Write to database
        submitToAPI(e)
    }

    //Delete Player
    const onDeletePlayer = (id) => {
        setPlayersInDraw(playersInDraw.filter((player) => player.id !== id))
    }

    const reloadPlayersInDraw = () => {
        setPlayersInDraw(Array.from(players))
        setPlayerSeedPoints(Array.from(players).map(player=>[player.id,seedPoints(player.id)]))
    }

    //Get draws
    useEffect(() => {
       reloadPlayersInDraw()
    }, [players])

    const setTypeAndSeeding = (type) => {
        if (type==='0' || type ==='1'){
            setUseSeedings(true)
        } else {
            setUseSeedings(false)
        }
        setType(type)
    }

    const onSeedingChange = (playerId, seedPoints) => {
        console.log(playerId, ' changed seeding to ',seedPoints)
        setPlayerSeedPoints(playerSeedPoints.map(element =>
            playerId === element[0] ? [playerId,seedPoints]:element
        ))
    }

    return (
        <>
            <form className='add-form' onSubmit={onSubmit} >
                <div className='form-control'>
                    <label>Draw name</label>
                    <input type='text' placeholder='Name of draw'
                           value={name} onChange={(e) => setName(e.target.value)}
                    />

                </div>
                <div className='form-control from-control-check'>
                    <p>Select the type of the draw:</p>

                    <select onChange={(e) => {
                        setTypeAndSeeding(e.target.value)
                        console.log(e.target.value,'selected')
                    }}>
                        <option value="0" >Knock-Out</option>
                        <option value="2" >Round Robin</option>
                        <option value="1" >Monrad</option>
                    </select>
                </div>

                <div>
                    <p>Number of games:</p>
                    <input type="number" id="games" min="1" max="9"
                           value={games}
                           onInput={() => {
                               setGames(document.getElementById("games").value)
                           }}
                    />


                    <p>Points per game:</p>
                    <input type="number" id="points" min="1" max="50"
                           value={points}
                         onInput={() => {
                             setPoints(document.getElementById("points").value)
                         }}
                    />

                    <p>Allow tiebreaks:</p>
                    <input type="checkbox" id="tiebreaks"
                           value={tieBreaks}
                           onChange={() => {
                               setTieBreaks(document.getElementById("tiebreaks").checked)
                           }}
                    />


                </div>



                <Players
                    players={playersInDraw}
                    hideSelection={true}
                    title={'Players in your draw'}
                    onDelete={onDeletePlayer}
                    showViewButton={false}
                    isUsingSeedings={useSeedings}
                    onSeedingChange={onSeedingChange}
                />

                <input type='submit' value='Save Draw' className='btn btn-block' />
            </form>
            <Button text={'Reload players in draw'} onClick={reloadPlayersInDraw} color={'red'}/>


        </>

    )
}




export default AddDraw