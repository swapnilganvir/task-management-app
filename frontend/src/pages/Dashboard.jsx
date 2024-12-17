import React, { useContext } from 'react';
import {
  Box,
  Container,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { dashboardData, priorityData } from '../assets/assets';
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
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f0f4f7',
  },
}));

const Dashboard = () => {
  const { tasksData } = useContext(StoreContext);

  function hourDifference(row) {
    const x = new Date(row.start_time).getTime();
    let y;
    // if task is finished then take end time else take current time
    if (row.status) {
      y = new Date(row.end_time).getTime();
    } else {
      y = new Date().getTime();
    }
    return (y - x) / (1000 * 60 * 60);
  }

  function hourToFinish(row) {
    const x = new Date().getTime();
    const y = new Date(row.end_time).getTime();
    // if current time > end time, then this should be taken as zero
    if (y - x > 0) {
      return (y - x) / (1000 * 60 * 60);
    } else {
      return 0;
    }
  }

  function calculateStats() {
    const total = tasksData.length;
    let completed = 0,
      avg_time = 0,
      time_lapsed = 0,
      tt_finish = 0;

    tasksData.forEach(item => {
      if (item.status) {
        completed += 1;
        avg_time += hourDifference(item);
      } else {
        time_lapsed += hourDifference(item);
        tt_finish += hourToFinish(item);
      }
    });

    dashboardData.total_tasks = total;
    dashboardData.completed_tasks = completed;
    dashboardData.pending_tasks = total - completed;
    dashboardData.avg_time_per_comp_task = avg_time.toFixed(1);
    dashboardData.total_time_lapsed = time_lapsed.toFixed(1);
    dashboardData.total_time_to_finish = tt_finish.toFixed(1);
  }

  function calculatePriorityStats() {
    priorityData.forEach(item => {
      let cnt = 0,
        time_lapsed = 0,
        tt_finish = 0;

      tasksData.forEach(task => {
        if (!task.status && task.priority === item.priority) {
          cnt += 1;
          time_lapsed += hourDifference(task);
          tt_finish += hourToFinish(task);
        }
      });

      item.count = cnt;
      item.time_lapsed = time_lapsed === 0 ? 0 : time_lapsed.toFixed(1);
      item.time_to_finish = tt_finish === 0 ? 0 : tt_finish.toFixed(1);
    });
  }

  calculateStats();
  calculatePriorityStats();

  return (
    <Container>
      <Typography variant="h4" sx={{ my: '20px' }}>
        Dashboard
      </Typography>
      <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="h6">Summary</Typography>
        <Box
          sx={{ display: 'flex', justifyContent: 'flex-start', gap: '30px' }}
        >
          <Box>
            <Typography variant="h6" color="primary">
              {dashboardData.total_tasks}
            </Typography>
            <Typography variant="body2">Total tasks</Typography>
          </Box>
          <Box>
            <Typography variant="h6" color="primary">
              {`${
                (dashboardData.completed_tasks / dashboardData.total_tasks) *
                100
              }%`}
            </Typography>
            <Typography variant="body2">Taks Completed</Typography>
          </Box>
          <Box>
            <Typography variant="h6" color="primary">
              {`${
                (dashboardData.pending_tasks / dashboardData.total_tasks) * 100
              }%`}
            </Typography>
            <Typography variant="body2">Tasks pending</Typography>
          </Box>
          <Box>
            <Typography variant="h6" color="primary">
              {`${dashboardData.avg_time_per_comp_task} hrs`}
            </Typography>
            <Typography variant="body2">
              Average time per completed task
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="h6">Pending task summary</Typography>
        <Box
          sx={{ display: 'flex', justifyContent: 'flex-start', gap: '30px' }}
        >
          <Box>
            <Typography variant="h6" color="primary">
              {dashboardData.pending_tasks}
            </Typography>
            <Typography variant="body2">Pending tasks</Typography>
          </Box>
          <Box>
            <Typography variant="h6" color="primary">
              {`${dashboardData.total_time_lapsed} hrs`}
            </Typography>
            <Typography variant="body2">Total time lapsed</Typography>
          </Box>
          <Box>
            <Typography variant="h6" color="primary">
              {`${dashboardData.total_time_to_finish} hrs`}
            </Typography>
            <Typography variant="body2">
              Total time to finish estimated based on end time
            </Typography>
          </Box>
        </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Task priority</StyledTableCell>
              <StyledTableCell align="center">Pending tasks</StyledTableCell>
              <StyledTableCell align="center">
                Time lapsed (hrs)
              </StyledTableCell>
              <StyledTableCell align="center">
                Time to finish (hrs)
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {priorityData.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{row.priority}</StyledTableCell>
                <StyledTableCell align="center">{row.count}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.time_lapsed}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.time_to_finish}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;
