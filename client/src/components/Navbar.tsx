import React, { useState, useEffect } from "react";
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkmode } from '../features/appSlice';
import { Link } from "react-router-dom"

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


function Navbar(props) {
    const dispatch = useDispatch();

    const isDarkmode = useSelector((state: any) => state.app.isDarkmode);
    const colorMode = isDarkmode == false ? 'rgba(255,255,255,0.7)' : 'rgba(18, 18, 18,0.7)'
    const blurBackground = { backdropFilter: "blur(8px)", backgroundColor: colorMode, boxShadow: "none", backgroundImage: "none" }

    const toggleColorMode = () => {
        dispatch(toggleDarkmode({
            isDarkmode: isDarkmode == false ? true : false
        }))
        
    }

    const handleTitleClick = () => {
        location.href = '/'
    }

    return (
        <Box sx={{ flexGrow: 1, width: '100%' }} >
          <AppBar position="fixed" sx={{ ...blurBackground }}>
            <Toolbar>
              <Typography component="div" color="text.primary" onClick={handleTitleClick} sx={{ flexGrow: 1, fontSize: "1rem" }}>
                <Link to={'/'}>
                    <b>Board</b>

                </Link>
              </Typography>
              {props.children}

              <IconButton sx={{ ml: 1}} onClick={toggleColorMode} color="primary">
                {isDarkmode === true ? <Brightness7Icon sx={{ fontSize: "1.2rem"  }} /> : <Brightness4Icon sx={{ fontSize: "1.2rem"  }} />}
            </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
      );
}


export default Navbar;