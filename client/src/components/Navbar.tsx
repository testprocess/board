import React, { useState, useEffect } from "react";

import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';


function Navbar(props) {
    return (
        <Box sx={{ flexGrow: 1, width: '100%' }} >
          <AppBar position="fixed">
            <Toolbar>
              <Typography component="div" sx={{ flexGrow: 1, fontSize: "1rem" }}>
                <b>Board</b>
              </Typography>
              {props.children}
            </Toolbar>
          </AppBar>
        </Box>
      );
}


export default Navbar;