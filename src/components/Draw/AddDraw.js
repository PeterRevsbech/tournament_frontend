import { useState } from 'react'
import axios from 'axios'
import {api_address} from "../../App";

const AddDraw = ({ onAdd }) => {
    const [name, setName] = useState('')
    const [day, setDay] = useState('')

    const submitToAPI = (e) => {
        e.preventDefault();

        const draw = {
            "name": name,
            "drawTypeDTO":0,
        };

        axios({
            method: 'post',
            url: `${api_address}Draw`,
            data: draw
        })
            .then(res => {
                onAdd(res.data)
            })

    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (!name) {
            alert('Please add a name for the draw')
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
                <label>Draw name</label>
                <input type='text' placeholder='Name of draw'
                       value={name} onChange={(e) => setName(e.target.value)}
                />

            </div>
            <div className='form-control from-control-check'>
                <label>Start day and time</label>
                <input type='datetime-local' placeholder='Add Day and time'
                       value={day} onChange={(e) => setDay(e.target.value)}
                />
            </div>

            <input type='submit' value='Save Draw' className='btn btn-block' />
        </form>


    )


}

export default AddDraw