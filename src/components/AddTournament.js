import {useState} from 'react'

const AddTournament = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!text) {
            alert('Please add a tournament')
            return
        }

        onAdd({ text, day, reminder })

        setText('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit} >
            <div className='form-control'>
                <label>Tournament</label>
                <input type='text' placeholder='Add Tournament'
                    value={text} onChange={(e) => setText(e.target.value)}
                />
                
            </div>
            <div className='form-control from-control-check'>
                <label>Day and time</label>
                <input type='text' placeholder='Add Day and time'
                    value={day} onChange={(e) => setDay(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label>Set Reminder</label>
                <input type='checkbox'
                    checked={reminder}
                    value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}
                />
            </div>

            <input type='submit' value='Save Tournament' className='btn btn-block' />
        </form>
        
        
        )


}

export default AddTournament