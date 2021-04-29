import { useState } from 'react'
import axios from 'axios'
import {api_address} from "../../App";
import Players from "../Player/Players";
import Button from "../Button";

const AddDraw = ({ onAdd, tournament, nameTaken, players  }) => {
    const [name, setName] = useState('')
    const [type, setType] = useState('0')
    const [playersInDraw, setPlayersInDraw] = useState(Array.from(players))
    const [useSeedings, setUseSeedings] = useState(true)




    const submitToAPI = (e) => {

        e.preventDefault();
        console.log(type)

        const playerIds = playersInDraw.map(
            player=>player.id
        )

        const draw = {
            "name": name,
            "drawTypeDTO":type,
            "tournamentId": tournament.id,
            "sets":0,
            "games":5,
            "points":11,
            "tiebreaks":true
        };

        axios({
            method: 'post',
            url: `${api_address}Draw/Generate/`,
            data: draw
        })
            .then(res => {
                onAdd(res.data)
                console.log(res.data);
                tournament.drawIds.push(res.data.id)
            })
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
        }

        if (playersInDraw.length===0){
            alert('There are no players in the draw')
        }

        //Write to database
        submitToAPI(e)

        //Clear fields
        setName('')
    }

    //Delete Player
    const onDeletePlayer = (id) => {
        setPlayersInDraw(playersInDraw.filter((player) => player.id !== id))
    }

    const reloadPlayersInDraw = () => {
        setPlayersInDraw(Array.from(players))
    }

    const setTypeAndSeeding = (type) => {
        if (type==='0' || type ==='1'){
            setUseSeedings(true)
        } else {
            setUseSeedings(false)
        }
        setType(type)
    }

    const onSeedingChange = (playerId, seed) => {
        console.log(playerId, ' changed seeding to ',seed)
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



                <Players
                    players={playersInDraw}
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