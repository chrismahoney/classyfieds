import React from 'react';

import {
  AppBar,
  Toolbar,
  Typography
} from '@mui/material';

const AppFrame = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Classyfieds
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppFrame;