import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  styled,
  Checkbox,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import AddTask from '../components/AddTask';
import EditTask from '../components/EditTask';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../context/StoreContext';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#7a8797',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const TaskList = () => {
  // style
  const lowerCase = { textTransform: 'initial' };

  const { URL, tasksData, loadData } = useContext(StoreContext);

  const [tasks, setTasks] = useState([]);

  const [sortBy, setSortBy] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');

  const [isSelected, setIsSelected] = useState([]);

  const [addTask, setAddTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [editTaskID, setEditTaskID] = useState('');

  // functions
  function helperSortSelect(priority, status, sortBy, data) {
    if (priority) {
      data = data.filter(row => row.priority == priority);
    }
    if (status) {
      const temp = status === 'Finished' ? true : false;
      data = data.filter(row => row.status == temp);
    }

    // sorting after filter makes sense
    function helper(x, y) {
      x = new Date(x).getTime();
      y = new Date(y).getTime();
      return x - y;
    }
    if (sortBy) {
      if (sortBy === 'STA') {
        data = data.sort((a, b) => helper(a.start_time, b.start_time));
      } else if (sortBy === 'STD') {
        data = data.sort((b, a) => helper(a.start_time, b.start_time));
      } else if (sortBy === 'ETA') {
        data = data.sort((a, b) => helper(a.end_time, b.end_time));
      } else if (sortBy === 'ETD') {
        data = data.sort((b, a) => helper(a.end_time, b.end_time));
      }
    }
    return data;
  }
  function handleSortBy(e) {
    const val = e.target.value;
    setSortBy(val);
    setTasks(helperSortSelect(priority, status, val, tasksData));
  }
  function handlePriority(e) {
    const val = e.target.value;
    setPriority(val);
    setTasks(helperSortSelect(val, status, sortBy, tasksData));
  }
  function handleStatus(e, v) {
    const val = e.target.value;
    setStatus(val);
    setTasks(helperSortSelect(priority, val, sortBy, tasksData));
  }

  function hourDifference(row) {
    const x = new Date(row.start_time).getTime();
    let y;
    if (row.status) {
      y = new Date(row.end_time).getTime();
    } else {
      y = new Date().getTime();
    }
    return ((y - x) / (1000 * 60 * 60)).toFixed(1);
  }

  function selectRow(e, rowId) {
    if (e.target.checked) {
      setIsSelected(prev => [...prev, rowId]);
    } else {
      setIsSelected(isSelected.filter(id => id !== rowId));
    }
    // console.log(isSelected);
  }
  function sellectAll(e) {
    if (e.target.checked) {
      setIsSelected(tasks.map(row => row._id));
    } else {
      setIsSelected([]);
    }
    // console.log(isSelected);
  }

  function handleAdd() {
    setAddTask(prev => !prev);
  }
  function handleEdit(row) {
    if (row) {
      setEditTaskID(row._id);
    }
    setEditTask(prev => !prev);
  }

  async function handleDelete() {
    const response = await axios.post(`${URL}/api/task/remove`, {
      ids: isSelected,
    });
    if (response.data.success) {
      toast.success(response.data.message);
      getTasks();
    } else {
      console.log(response.data.message);
    }
  }

  async function getTasks() {
    loadData();

    setSortBy('');
    setPriority('');
    setStatus('');
    setIsSelected([]);
  }

  // effects
  useEffect(() => {
    setTasks(tasksData);
  }, [tasksData]);

  return (
    <Container>
      <Typography variant="h4" sx={{ my: '20px' }}>
        Task list
      </Typography>
      <Box
        sx={{
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}
        >
          <Button variant="outlined" sx={lowerCase} onClick={handleAdd}>
            Add task
          </Button>
          <AddTask
            addTask={addTask}
            handleAdd={handleAdd}
            getTasks={getTasks}
            URL={URL}
          />
          <Button
            variant="outlined"
            sx={lowerCase}
            color="error"
            onClick={handleDelete}
          >
            Delete selected
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          <FormControl sx={{ minWidth: '80px' }} size="small">
            <InputLabel>Sort</InputLabel>
            <Select
              value={sortBy}
              onChange={handleSortBy}
              sx={{
                borderRadius: '2em',
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="STA">Start time: ASC</MenuItem>
              <MenuItem value="STD">Start time: DESC</MenuItem>
              <MenuItem value="ETA">End time: ASC</MenuItem>
              <MenuItem value="ETD">End time: DESC</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: '120px' }} size="small">
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              onChange={handlePriority}
              sx={{ borderRadius: '2em' }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: '120px' }} size="small">
            <InputLabel>Status</InputLabel>
            <Select
              label="a"
              labelId="b"
              id="c"
              value={status}
              onChange={handleStatus}
              sx={{ borderRadius: '2em' }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Finished">Finished</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                <Checkbox
                  checked={
                    tasks.length > 0 && tasks.length === isSelected.length
                  }
                  onChange={sellectAll}
                />
              </StyledTableCell>
              <StyledTableCell align="center">Task ID</StyledTableCell>
              <StyledTableCell align="center">Title</StyledTableCell>
              <StyledTableCell align="center">Priority</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Start Time</StyledTableCell>
              <StyledTableCell align="center">End Time</StyledTableCell>
              <StyledTableCell align="center">Total time (hrs)</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.map((row, index) => (
              <TableRow key={index}>
                <StyledTableCell align="center">
                  <Checkbox
                    checked={isSelected.includes(row._id)}
                    onChange={e => selectRow(e, row._id)}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row._id.substring(row._id.length - 5)}
                </StyledTableCell>
                <StyledTableCell align="center">{row.title} </StyledTableCell>
                <StyledTableCell align="center">{row.priority}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.status ? 'Finished' : 'Pending'}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {new Date(row.start_time).toLocaleString('en-IN')}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {new Date(row.end_time).toLocaleString('en-IN')}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row && hourDifference(row)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button onClick={() => handleEdit(row)}>🖊️</Button>
                  {editTaskID === row._id && (
                    <EditTask
                      editTask={editTask}
                      handleEdit={handleEdit}
                      getTasks={getTasks}
                      URL={URL}
                      row={row}
                    />
                  )}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TaskList;
