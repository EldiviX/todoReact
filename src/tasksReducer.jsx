export default function tasksReducer(tasks, action) {
    switch (action.type) {
        case 'added': {
            return [ ...tasks, {
                id: action.id,
                text: action.text,
                ready: false
            }];
        }
        case 'checkboxChange': {
            const updatedTasks = tasks.map(task =>
                task.id === action.id ? { ...task, ready: !task.ready } : task
            );
        
            const updatedTask = updatedTasks.find(task => task.id === action.id);
        
            return updatedTask.ready
                ? [updatedTask, ...updatedTasks.filter(task => task.id !== action.id)]
                : [...updatedTasks.filter(task => task.id !== action.id), updatedTask];
        }
        case 'deleted': {
            return tasks.filter(t => t.id !== action.id);
        }
        case 'changed': {
            return tasks.map(task => 
                (task.id === action.id) ? {...task, text: action.text} : task
            );
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}