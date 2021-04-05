import { useState } from 'react'
import axios from 'axios'

const AddTournament = ({ onAdd }) => {
    const [name, setName] = useState('')
    const [day, setDay] = useState('')
    const api_address = 'https://localhost:5001/api/'

    const submitToAPI = (e) => {
        e.preventDefault();

        const tournament = {
            "name": name,
            "startDate": day
        };

        axios({
            method: 'post',
            url: `${api_address}Tournament`,
            data: tournament
        })
            .then(res => {
                onAdd(res.data)
            })

    }   

    const onSubmit = (e) => {
        e.preventDefault()

        if (!name) {
            alert('Please add a name for the tournament')
            return
        } else if (!day) {
            alert('Please select a time and day')
            return
        }


        //Write to database
        submitToAPI(e)  

        //Clear fields
        setName('')
        setDay('')
    }

    return (
        <form className='add-form' onSubmit={onSubmit} >
            <div className='form-control'>
                <label>Tournament name</label>
                <input type='text' placeholder='Name of tournament'
                    value={name} onChange={(e) => setName(e.target.value)}
                />
                
            </div>
            <div className='form-control from-control-check'>
                <label>Start day and time</label>
                <input type='datetime-local' placeholder='Add Day and time'
                    value={day} onChange={(e) => setDay(e.target.value)}
                />
            </div>
      
            <input type='submit' value='Save Tournament' className='btn btn-block' />
        </form>
        
        
        )


}

export default AddTournament