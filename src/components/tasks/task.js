import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import UpdateIcon from '@material-ui/icons/Update';
import './tasks.css';

function Tasks(props) {
  const handleDelete = () => {
    props.handleDelete(props.id)
  }
  const handleUpdate = () => {
    props.handleUpdate(props.index)
  }
  return (
    <ListItem
      key={props.id}
      button
      className={`${props.status}`}>
      {props.isImportant ?
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        : (null)}
      <ListItemText 
      primary={props.text} 
      secondary={new Date(props.deadline).toLocaleString()} />
      
      <ListItemSecondaryAction>
      <IconButton edge="end" aria-label="delete" onClick={handleUpdate}>
          <UpdateIcon />
        </IconButton>
        <IconButton edge="end"  onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
export default Tasks;
