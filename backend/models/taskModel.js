import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: Number, required: true },
  status: { type: Boolean, required: true },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
});

const taskModel = mongoose.models.task || mongoose.model('task', taskSchema);

export default taskModel;
