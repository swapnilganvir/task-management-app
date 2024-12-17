import express from 'express';
import {
  addTask,
  editTask,
  listTask,
  removeTask,
} from '../controllers/taskController.js';

const taskRouter = express.Router();

taskRouter.post('/add', addTask);
taskRouter.get('/list', listTask);
taskRouter.post('/remove', removeTask);
taskRouter.post('/edit', editTask);

export default taskRouter;
