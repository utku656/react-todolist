import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './createModal.css';

function CreateModal(props) {
    const [status, setStatus] = useState('');
    const [isImportant, setIsImportant] = useState(false);
    const [task, setTask] = useState('');
    const [deadline, setDeadline] = useState('');


    const handleChange = (value) => {

        setStatus(value);
    }
    const handleChangeCheckbox = () => {

        setIsImportant(!isImportant);
    }
    const handleChangeTask = (value) => {

        setTask(value);
    }
    const handleChangeDeadline = (value) => {

        setDeadline(value);
    }
    const handleSubmit = () => {
        const newTask = {
            text: task,
            deadline: deadline,
            status: status,
            isImportant: isImportant
        }
        props.handleOK(newTask);
    }
    return (
        <div>
            <DialogTitle id="form-dialog-title">Create New Task</DialogTitle>
            <DialogContent className='modal-content'>
                <TextField
                    autoFocus
                    margin="dense"
                    id="1"
                    label="Task"
                    value={task}
                    type="text"
                    fullWidth
                    onChange={(event) => handleChangeTask(event.target.value)}
                    className='field'

                />
                <TextField
                    id="datetime-local"
                    label="Deadline"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    value={deadline}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event) => handleChangeDeadline(event.target.value)}
                    className='field'

                />
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    onChange={(event) => handleChange(event.target.value)}
                    className='field'

                >
                    <MenuItem value={'Completed'}>Completed</MenuItem>
                    <MenuItem value={'Incomplete'}>Incomplete</MenuItem>
                    <MenuItem value={'In-Progress'}>In-Progress</MenuItem>
                </Select>

                <FormControlLabel
                    control={<Checkbox
                        checked={isImportant}
                        onChange={() => handleChangeCheckbox()}
                        name="checkbox"
                        color="primary"
                    />}
                    label="Is Really Important?"
                    labelPlacement="start"
                    className='field'

                />

            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </div>
    );
}
export default CreateModal;
