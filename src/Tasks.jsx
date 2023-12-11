import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';
import { Checkbox } from "@mui/material"
import { IconButton } from '@mui/material';
import { TasksContext, TasksDispatchContext } from './Context';
import { useState, useEffect, useContext } from 'react';

export default function Tasks() {
    const tasks = useContext(TasksContext)
    const dispatch = useContext(TasksDispatchContext)
    const planned = tasks.filter(task => !task.ready)
    const done = tasks.filter(task => task.ready)

    const [planScore, setPlan] = useState()
    const [doneScore, setDone] = useState()
    
    useEffect(() => {
        setPlan(planned.filter((i) => i).length)
        setDone(done.filter((i) => i).length)
    }, [planned, done])

    function handleCheckboxChange(taskId) {
        dispatch({
            type: 'checkboxChange',
            id: taskId
        })
    }

    const plannedList = planned.map(task =>
        <PlannedTask key={task.id} task={task}/>
    )

    const doneList = done.map(task =>
        <div className="plan_task" id={task.id} key={task.id}>
            <Checkbox 
                style={
                    {maxWidth: "38px", maxHeight: "38px", flexShrink: 0}
                }
                size='small'
                variant="outlined"
                checked={task.ready}
                onChange={() => handleCheckboxChange(task.id)}
            />
            <div className="text">{task.text}</div>
            <IconButton
                key={`delete-${task.id}`}
                onClick={ () => dispatch({type: 'deleted', id: task.id})}
                
                size='small'   
                style={{
                    marginLeft: "auto",
                    maxWidth: "38px", maxHeight: "38px", flexShrink: 0
                }} 
            >
                <DeleteIcon 
                    style={{
                        fontSize: "21px", padding: "2px", color: "#72799f"
                    }}
                />
            </IconButton>
        </div>
    )
    
    return (
        <div className="content-list">
            {planned.length > 0 && (
                <div className="plan_container">
                    <div className="plan_container__name">ПЛАН ({planScore})</div>
                    {plannedList}
                    
                </div>
            )}
            
            {done.length > 0 && (
                <div className="plan_container">
                    <div className="plan_container__name">ГОТОВО ({doneScore})</div>
                    {doneList}
                </div>
            )}
        </div>
    )
}

function PlannedTask({task}) {
    const dispatch = useContext(TasksDispatchContext)
    const [checkEdit, setCheckEdit] = useState(false);
    
    function handleCheckboxChange(taskId) {
        dispatch({
            type: 'checkboxChange',
            id: taskId
        })
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            setCheckEdit(false);
        }
    }

    return (
        
        <div className="plan_task" id={task.id} key={task.id}>
            { !checkEdit ? (
                <><Checkbox 
                    style={
                        {maxWidth: "38px", maxHeight: "38px", flexShrink: 0}
                    }
                    size='small'
                    variant="outlined"
                    checked={task.ready}
                    onChange={() => handleCheckboxChange(task.id)}
                
                />
                <div key={`divText-${task.id}`} className="text">{task.text}</div>
                <IconButton
                    key={`edit-${task.id}`}
                    onClick={() => {
                        setCheckEdit(true)
                    }}
                    size='small'   
                    style={{
                        marginLeft: "auto",
                        maxWidth: "38px", maxHeight: "38px", flexShrink: 0
                    }} 
                >
                    <EditIcon 
                        style={{
                            fontSize: "21px", padding: "2px", color: "#a5608e"
                        }}
                    />
                </IconButton>
                <IconButton
                    key={`delete-${task.id}`}
                    onClick={ () => dispatch({type: 'deleted', id: task.id})}
                    size='small'   
                    style={{
                        marginLeft: "1px",
                        maxWidth: "38px", maxHeight: "38px", flexShrink: 0
                    }} 
                >
                    <DeleteIcon 
                        style={{
                            fontSize: "21px", padding: "2px", color: "#72799f"
                        }}
                    />
                </IconButton></>
            ) : (
                <TextField 
                    key={`text-${task.id}`}
                    variant='standard'
                    label='Имя задачи'
                    size='small'
                    style={{ marginLeft: '12px', width: '100%' }}
                    margin="normal"
                    className="custom-textfield"
                    InputProps={{
                        endAdornment: (
                        <IconButton
                            style={{padding: '2px' }}
                            onClick={() => setCheckEdit(false)}
                        >
                            <DoneIcon style={{color: '#a5608e', fontSize: 24 } }
                            />
                        </IconButton>
                        ),
                    }}
                    value={task.text}
                    onChange={(e)=> dispatch({type: "changed", text: e.target.value, id: task.id})}
                    onKeyDown={handleKeyPress}
                />
            )}
        </div>
    )
}