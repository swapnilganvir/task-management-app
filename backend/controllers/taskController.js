import taskModel from '../models/taskModel.js';

// add a task
const addTask = async (req, res) => {
  const task = new taskModel({
    title: req.body.title,
    priority: req.body.priority,
    status: req.body.status,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
  });

  try {
    await task.save();
    res.json({ success: true, message: 'Task Added' });
  } catch (error) {
    // console.log(error);
    console.log('Error');
    res.json({ success: false, message: 'Error' });
  }
};

// all tasks list
const listTask = async (req, res) => {
  try {
    const tasks = await taskModel.find({});
    res.json({ success: true, data: tasks });
  } catch (error) {
    // console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

// remove a task
const removeTask = async (req, res) => {
  try {
    // const task = await taskModel.findById(req.body.id)
    const _ids = req.body.ids;
    // console.log(_ids);

    await taskModel.deleteMany({
      _id: { $in: _ids },
    });
    res.json({ success: true, message: 'Task Removed' });
  } catch (error) {
    // console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

// edit a task
const editTask = async (req, res) => {
  const updatedTask = {
    title: req.body.title,
    priority: req.body.priority,
    status: req.body.status,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
  };

  try {
    await taskModel.findByIdAndUpdate(req.body.id, updatedTask);
    res.json({ success: true, message: 'Task Updated' });
  } catch (error) {
    // console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

export { addTask, listTask, removeTask, editTask };
