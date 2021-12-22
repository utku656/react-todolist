import axios from 'axios';

const BASE_URL ='http://localhost:8000'
const getTasks = () => 
  axios.get(BASE_URL+'/tasks');
const getTaskById = (id) => 
  axios.get(BASE_URL+'/tasks/'+id);
const createNewTask = (task) => 
  axios.post(BASE_URL+'/tasks',task);
const updateById = (id,task) => 
  axios.put(BASE_URL+'/tasks/'+id,{
    text:task.text,
    deadline:task.deadline,
    isImportant:task.isImportant,
    status:task.status
  });
const deleteById = (id) => 
  axios.delete(BASE_URL+'/tasks/'+id);

  export{
      getTasks,
      getTaskById,
      createNewTask,
      updateById,
      deleteById
    };