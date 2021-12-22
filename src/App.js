import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import Tasks from './components/tasks/task'
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import './App.css';
import {
  getTasks,
  createNewTask,
  updateById,
  deleteById
} from './actions/api'
import CreateModal from './components/modals/CreateModal/createModal'
import EditModal from './components/modals/EditModal/editModal'

function App() {
  const [tasks, setTasks] = useState([]);
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [editTask, setEditTask] = useState({});

  useEffect(() => {
    getTasks().then(response => {
      setTasks(response.data);
    })
  }, []);
  
  const handleDelete = async (value) => {
    await deleteById(value)
      getTasks().then(response => {
        setTasks(response.data);
      })
  }
  const handleEditModal = (value) => {
    setEditTask(value);
    setIsEditModal(!isEditModal);
  }
  const handleCreateTask = async (task) => {
    await createNewTask(task);
    setIsCreateModal(!isCreateModal); 
  }
  const handleEditTask = async (id,task) => {
    await updateById(id,task);
    getTasks().then(response => {
      setTasks(response.data);
    })
    setIsEditModal(!isEditModal);
  }
  return (
    <div className='todo-main'>
      <div className='todo-header'>
        <Typography variant="h5" className='todo-header-text'>
          Plan of Today
        </Typography>
        <IconButton edge="end" onClick={() => setIsCreateModal(!isCreateModal)} className='todo-create'  >
          <CreateIcon />
        </IconButton>
      </div>

      <List component="nav" className='todo-list'>
        {tasks.map((task,index) => (
          <Tasks id={task.id}
            isImportant={task.isImportant}
            handleDelete={handleDelete}
            handleUpdate={() => handleEditModal(task)}
            deadline={task.deadline}
            text={task.text}
            status={task.status}
            index={index} />
        ))}
      </List>
      <Dialog open={isCreateModal} onClose={() => setIsCreateModal(!isCreateModal)} >
        <CreateModal 
        handleClose={() => setIsCreateModal(!isCreateModal)} 
        handleOK={handleCreateTask} >
        </CreateModal>
      </Dialog>
      <Dialog open={isEditModal} onClose={handleEditModal} >
        <EditModal 
        handleClose={handleEditModal} 
        handleOK={handleEditTask} 
        task={editTask}>
        </EditModal>
      </Dialog>


    </div>
  );
}

export default App;
