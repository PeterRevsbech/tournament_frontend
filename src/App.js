import './App.css';
import { useState } from 'react'
import Tasks from './components/Tasks'
import Header from './components/Header'
import AddTask from './components/AddTask'



function App() {

    const [showAddTask,setShowAddTask] = useState(false)

    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: 'Doctors Appointment',
            day: 'Feb 5th at 2:30 pm',
            reminder: true,
        },
        {
            id: 2,
            text: 'Groceries',
            day: 'Feb 6th at 2:30 pm',
            reminder: true,
        },
        {
            id: 3,
            text: 'Workout',
            day: 'Feb 7th at 2:30 pm',
            reminder: true,
        }
    ])

    //Add Task
    const addTask = (task) => {
        const id = Math.floor(Math.random() * 10000) + 1
        const newTask = { id, ...task }
        setTasks([...tasks, newTask])
    }


    // Delete Task
    const deleteTask = (id) => {
        setTasks(tasks.filter( (task) => task.id !== id))
    }

    //Toggle Reminder
    const toggleReminder = (id) => {
       
        setTasks(
            tasks.map((task) =>
            task.id === id ? { ...task, reminder: !task.reminder } : task
        ))
    }

  return (
      <div className="container">
          <Header title='Task tracker' onAdd={() =>
              setShowAddTask(!showAddTask)}
              showAddButton={!showAddTask}
          />
          {showAddTask && < AddTask onAdd={addTask} />}        
          {tasks.length > 0 ?
              <Tasks tasks={tasks} onToggle={toggleReminder} onDelete={deleteTask} />
              : 'No tasks to show'
          }
    </div>
  );
}

export default App;
