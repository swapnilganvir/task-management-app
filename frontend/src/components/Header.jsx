import React from 'react';
import { Box, Tabs, Tab, Button } from '@mui/material';

const Header = ({ tab, handleChange, signedIn, setSignedIn, setTab }) => {
  const lowerCase = {
    textTransform: 'initial',
    fontWeight: '600',
    color: 'black',
  };

  function handleClick() {
    setSignedIn(false);
    setTab(false);
    localStorage.removeItem('token');
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="fullwidth"
        sx={{ borderBottom: 1, borderColor: 'divider', width: '93%' }}
      >
        <Tab label="Dashboard" sx={lowerCase} />
        <Tab label="Task list" sx={lowerCase} />
      </Tabs>

      {signedIn && (
        <Button
          variant="contained"
          size="small"
          onClick={handleClick}
          sx={{ textTransform: 'initial', height: '2em' }}
        >
          Sign out
        </Button>
      )}
    </Box>
  );
};

export default Header;
