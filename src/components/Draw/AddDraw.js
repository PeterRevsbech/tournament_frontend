import { useState } from 'react'
import axios from 'axios'
import {api_address} from "../../App";

const AddDraw = ({ onAdd }) => {
    const [name, setName] = useState('')
    const [type, setType] = useState('0')

    const submitToAPI = (e) => {
        e.preventDefault();
        console.log(type)
        const draw = {
            "name": name,
            "drawTypeDTO":type,
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
        } else if (type === '') {
            alert('Please select a type for the draw')
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
                <label>Draw name</label>
                <input type='text' placeholder='Name of draw'
                       value={name} onChange={(e) => setName(e.target.value)}
                />

            </div>
            <div className='form-control from-control-check'>
                <p>Select the type of the draw:</p>

                <select onChange={(e) => {
                    setType(e.target.value)
                    console.log(e.target.value,'selected')
                }}>
                    <option value="0">Knock-Out</option>
                    <option value="2">Round Robin</option>
                    <option value="1">Monrad</option>
                </select>

            </div>

            <input type='submit' value='Save Draw' className='btn btn-block' />
        </form>


    )


}

export default AddDraw