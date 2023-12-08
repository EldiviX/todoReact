import { Checkbox } from "@mui/material"

export default function Plan({task, onCheckboxChange}) {

    const handleCheckboxChange = (itemId) => {
        onCheckboxChange(itemId);
    };
    
    return (
        <div className="plan_task" key={task.id}>
            <Checkbox 
                label={'task.name'}
                variant="outlined"
                checked={task.ready}
                onChange={() => handleCheckboxChange(task.id)}
            />
        </div>

    )
}

