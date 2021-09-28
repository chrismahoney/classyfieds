import React from 'react';

import {
  Link
} from 'react-router-dom';

import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography
} from '@mui/material';

import Authentication from '../services/Authentication';

const AppFrame = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Classyfieds
          </Typography>
            {Authentication.getUserInfo() ? (
              <Link to="/logout" style={{ textDecoration: 'none', color: '#fff' }}>LOG OUT</Link>
            ) : (
              <Link to="/login" style={{ textDecoration: 'none', color: '#fff' }}>LOG IN</Link>
            )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppFrame;