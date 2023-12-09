import './App.css'
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { useState, useEffect, useReducer, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TasksContext, TasksDispatchContext } from './Context';
import tasksReducer from './tasksReducer';
import Tasks from './Tasks';

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgba(0, 0, 0, 0.69)'
        },
    },
});

function App() {
    const [text, setText] = useState(true);
    const [taskName, setTaskName] = useState('');
    const [id, setId] = useState(0);
    const [tasks, dispatch] = useReducer(tasksReducer, []);

    useEffect(() => {
        setText(taskName.trim().length === 0)
    }, [taskName])

    
    function handleKeyPress(e) {
        if (e.key === 'Enter' && !text) {
            handleAddTask();
        }
    }
    
    function handleAddTask() {
        dispatch({
            type: 'added',
            id: id,
            text: taskName
        })
        setId(prevId => prevId + 1); 
        setTaskName('')
    }

    return (
        <ThemeProvider theme={theme}>
            <TasksContext.Provider value={tasks}>
                <TasksDispatchContext.Provider value={dispatch}>
                    <Container>
                        <div className="container_name">TODO</div>
                        <TextField 
                            variant='standard'
                            size='small'
                            label='Имя новой задачи'
                            margin="normal"
                            className="custom-textfield"
                            style={{
                                width: "475px"
                            }}
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

                        <Tasks/>

                    </Container>
                </TasksDispatchContext.Provider>
            </TasksContext.Provider>
        </ThemeProvider>
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
