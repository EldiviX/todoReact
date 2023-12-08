import React, { useState } from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskItem = ({ task, onEdit, onDelete, onToggleCheckpoint }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    // Обработка сохранения отредактированного текста
    onEdit(task.id, editedText);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    // Обработка отмены редактирования
    setEditedText(task.text);
    setIsEditing(false);
  };

  return (
    <ListItem key={task.id}>
      <Checkbox
        checked={task.ready}
        onChange={() => onToggleCheckpoint(task.id)}
      />
      {isEditing ? (
        <TextField
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <ListItemText primary={task.text} />
      )}
      <ListItemSecondaryAction>
        {isEditing ? (
          <>
            <IconButton onClick={handleSaveEdit} edge="end">
              {/* Иконка сохранения изменений */}
              Save
            </IconButton>
            <IconButton onClick={handleCancelEdit} edge="end">
              {/* Иконка отмены изменений */}
              Cancel
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={handleEdit} edge="end">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(task.id)} edge="end">
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TaskItem;
