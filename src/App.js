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
    }).catch((error) => {
      console.error("The Promise is rejected!", error);
    })
  }, []);

  const handleDelete = async (value) => {
    try {
      await deleteById(value)
      getTasks().then(response => {
        setTasks(response.data);
      }).catch((error) => {
        console.error("The Promise is rejected!", error);
      })
    } catch (e) {
      console.log(e);
    }
  }
  const handleEditModal = (value) => {
    setEditTask(value);
    setIsEditModal(!isEditModal);
  }
  const handleCreateTask = async (task) => {
    try {
      await createNewTask(task);
      getTasks().then(response => {
        setTasks(response.data);
      }).catch((error) => {
        console.error("The Promise is rejected!", error);
      })
    } catch (e) {
      console.log(e);
    }
    setIsCreateModal(!isCreateModal);
  }
  const handleEditTask = async (id, task) => {
    try {
      await updateById(id, task);
      getTasks().then(response => {
        setTasks(response.data);
      }).catch((error) => {
        console.error("The Promise is rejected!", error);
      })
    } catch (e) {
      console.log(e);
    }
    setIsEditModal(!isEditModal);
  }
  return (
    <div className='todo-main'>
      <div className='todo-header'>
        <Typography variant="h5" className='todo-header-text'>
          Plan of Today
        </Typography>
        <IconButton edge="end"
          onClick={() => setIsCreateModal(!isCreateModal)}
          label='Create New Task'
          className='todo-create'  >
          <CreateIcon />
        </IconButton>
      </div>
      <List component="nav" className='todo-list'>
        {tasks.map((task, index) => (
          <Tasks 
            key={task.id}
            id={task.id}
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
