import { useState } from 'react'
import axios from 'axios'
import {api_address} from "../../App";

const AddPlayer = ({ onAdd , nameTaken, tournament }) => {
    const [name, setName] = useState('')

    const submitToAPI = (e) => {
        e.preventDefault();

        const player = {
            "name": name,
            "tournamentId": tournament.id
        };

        axios({
            method: 'post',
            url: `${api_address}Player`,
            data: player
        })
            .then(res => {
                onAdd(res.data)
                tournament.playerIds.push(res.data.id)
            })


    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (!name) {
            alert('Please add a name for the player')
            return
        }

        if (nameTaken(name)){
            alert('The proposed name is already in use in this draw.')
            return
        }

        //Write to database
        submitToAPI(e)

        //Clear fields
        setName('')
    }

    return (
        <form className='add-form' onSubmit={onSubmit} >
            <div className='form-control'>
                <label>Player name</label>
                <input type='text' placeholder='Name of player'
                       value={name} onChange={(e) => setName(e.target.value)}
                />
            </div>

            <input type='submit' value='Save Player' className='btn btn-block' />
        </form>
    )
}

export default AddPlayer