import './App.css'
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { Checkbox } from "@mui/material"
import { IconButton } from '@mui/material';
import { useState, useEffect, useReducer } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { planContext } from './Context';
import tasksReducer from './tasksReducer';


// Логика добавления обновления тасков через редуктор

// import Done from './Done';
// import Plan from './Plan';

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgba(0, 0, 0, 0.69)'
        },
    },
  });

function App() {
    // const [arr, setArr] = useState([])
    const [text, setText] = useState(true)
    const [taskName, setTaskName] = useState('');
    const [id, setId] = useState(0);
    const [plan, setPlan] = useState()
    const [tasks, dispatch] = useReducer(tasksReducer, [])

    useEffect(() => {
        setText(taskName.trim().length === 0)
    }, [taskName])

    
    function handleKeyPress(e) {
        if (e.key === 'Enter' && !text) {
            handleAddTask();
        }
    }
    
    function handleAddTask() {
        setArr(prevArr => [
            ...prevArr,
            { id: id, text: taskName, ready: false }
        ]);
        dispatch({
            type: 'added'
        })
        console.log(arr);
        setId(prevId => prevId + 1); 
        setPlan(arr.filter(i => i.ready === false).length + 1)
        setTaskName('')
    }

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <div className="container_name">TODO</div>
                <TextField 
                    variant='standard'
                    size='small'
                    label='Имя новой задачи'
                    margin="normal"
                    className="custom-textfield"
                    InputProps={{
                        endAdornment: (
                        <IconButton
                            disabled={text}
                            style={{padding: '2px' }}
                            onClick={handleAddTask}
                        >
                            <AddIcon style={text ? {color: '#a5608e70', fontSize: 24 } : {color: '#a5608e', fontSize: 24 }}
                            />
                        </IconButton>
                        ),
                    }}
                    value={taskName}
                    onChange={(e)=>{setTaskName(e.target.value)}}
                    onKeyDown={handleKeyPress}
                />

                <Tasks arr={arr} plan={plan}/>

            </Container>
            
        </ThemeProvider>
    )
}

function Tasks({arr, plan}) {
    const [tasks, setTasks] = useState(arr);
    const planned = tasks.filter(task => !task.ready)
    const done = tasks.filter(task => task.ready)

    useEffect(() => {
        setTasks(arr);
    }, [arr]);
    

    function handleCheckboxChange(taskId) {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? {...task, ready: !task.ready} : task
            )
        )
    }

    const plannedList = planned.map(task =>
        <div className="plan_task" key={task.id}>
            <Checkbox 
                size='small'
                variant="outlined"
                checked={task.ready}
                onChange={() => handleCheckboxChange(task.id)}
            />
            <div className="text">{task.text}</div>
        </div>
    )

    const doneList = done.map(task =>
        <div className="plan_task" key={task.id}>
            <Checkbox 
                size='small'
                variant="outlined"
                checked={task.ready}
                onChange={() => handleCheckboxChange(task.id)}
            />
            <div className="text">{task.text}</div>
        </div>
    )
    
    return (
        <>
        {planned.length > 0 && (
            <div className="plan_container">
            <div className="plan_container__name">ПЛАН ({plan})</div>
            {plannedList}
        </div>
          )}
          
        {done.length > 0 && (
            <div className="plan_container">
            <div className="plan_container__name">ГОТОВО ({plan})</div>
            {doneList}
        </div>
        )}
        </>
          
    )
}

function Container({children}) {

    return (
        <div className="container">
            {children}
        </div>
    )
}




export default App
