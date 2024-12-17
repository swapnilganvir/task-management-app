import React, { useState } from 'react';
import { Box, Button, TextField, Tooltip, Typography } from '@mui/material';

const SignIn = ({ setSignedIn, setTab }) => {
  const [alertText, setAlertText] = useState({
    email_text: '',
    password_text: '',
  });
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function login() {
    if (userData.email === 'admin@123') {
      setAlertText({ email_text: '', password_text: '' });

      if (userData.password === '1234') {
        setSignedIn(true);
        setTab(0);
        localStorage.setItem('token', '12345678');
        console.log('Logged In');
      } else {
        setAlertText(prev => ({
          ...prev,
          password_text: 'Password Incorrect',
        }));
      }
    } else {
      setAlertText(prev => ({
        ...prev,
        email_text: 'Please enter a valid email',
      }));
    }
  }

  return (
    <Box component="form" sx={{ width: '25vw', maxWidth: '250px' }}>
      <Typography variant="h6">Welcome to To-do app</Typography>
      <Tooltip title="admin@123" placement="right">
        <TextField
          variant="outlined"
          name="email"
          label="email ID"
          value={userData.email}
          onChange={handleChange}
          helperText={alertText.email_text}
          fullWidth={true}
          sx={{ marginBottom: '15px' }}
        />
      </Tooltip>

      <Tooltip title="1234" placement="right">
        <TextField
          variant="outlined"
          name="password"
          label="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
          helperText={alertText.password_text}
          fullWidth={true}
          sx={{ marginBottom: '15px' }}
        />
      </Tooltip>
      <Button variant="contained" onClick={login} fullWidth={true}>
        Sign in to continue
      </Button>
    </Box>
  );
};

export default SignIn;
