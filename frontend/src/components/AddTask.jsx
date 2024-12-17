import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Slider,
  Switch,
  Typography,
} from '@mui/material';
import { priorityMarks } from '../assets/assets';

const AddTask = ({ addTask, handleAdd, getTasks, URL }) => {
  const style = {
    fontWeight: {
      fontWeight: '600',
    },
    fontSize: {
      fontSize: '12px',
    },
  };

  const [data, setData] = useState({
    title: '',
    priority: 3,
    status: false,
    start_time: '',
    end_time: '',
  });

  function onChangeHandler(event) {
    let { name, value } = event.target;
    // console.log(name, value);
    if (name === 'status') {
      value = event.target.checked;
    }
    setData(data => ({ ...data, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(data);
    const response = await axios.post(`${URL}/api/task/add`, data);
    if (response.data.success) {
      setData({
        title: '',
        priority: 3,
        status: false,
        start_time: '',
        end_time: '',
      });
      toast.success(response.data.message);
      getTasks();
    } else {
      toast.error(response.data.message);
    }
    handleAdd();
  }

  return (
    <React.Fragment>
      <Dialog
        open={addTask}
        onClose={handleAdd}
        PaperProps={{
          component: 'form',
          onSubmit: event => {
            handleSubmit(event);
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, fontSize: '1.5em' }}>
          Add new task
        </DialogTitle>
        <DialogContent sx={{ minWidth: '400px' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplate: 'repeat(3, 1fr) / repeat(2, 1fr)',
              gap: '10px 30px',
            }}
          >
            <Box sx={{ gridColumn: 'span 2' }}>
              <Typography sx={style.fontWeight}>Title</Typography>
              <TextField
                required
                name="title"
                value={data.title}
                onChange={onChangeHandler}
                size="small"
                sx={{ width: '70%' }}
              />
            </Box>

            <Box>
              <Typography sx={style.fontWeight}>Priority</Typography>
              <Slider
                name="priority"
                min={1}
                max={5}
                marks={priorityMarks}
                value={data.priority}
                onChange={onChangeHandler}
                size="medium"
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={style.fontWeight}>Status</Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography sx={style.fontSize}>Pending</Typography>
                <Switch
                  name="status"
                  value={data.status}
                  checked={data.status}
                  onChange={onChangeHandler}
                />
                <Typography sx={style.fontSize}>Finished</Typography>
              </Box>
            </Box>

            <Box>
              <Typography sx={style.fontWeight}>Start time</Typography>
              <TextField
                required
                name="start_time"
                size="small"
                type="datetime-local"
                value={data.start_time}
                onChange={onChangeHandler}
              ></TextField>
            </Box>

            <Box>
              <Typography sx={style.fontWeight}>End time</Typography>
              <TextField
                required
                name="end_time"
                size="small"
                type="datetime-local"
                value={data.end_time}
                onChange={onChangeHandler}
              ></TextField>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit">
            Add task
          </Button>
          <Button variant="outlined" onClick={handleAdd}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddTask;
