import React, { useState, useEffect } from "react";
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"

import EditIcon from '@mui/icons-material/Edit';


function Navbar({ children }: any) {
  const dispatch = useDispatch();

  const isDarkmode = useSelector((state: any) => state.app.isDarkmode);
  const colorMode = isDarkmode == false ? 'rgba(255,255,255,0.7)' : 'rgba(18, 18, 18,0.7)'
  const blurBackground = { backdropFilter: "blur(8px)", backgroundColor: colorMode, boxShadow: "none", backgroundImage: "none" }



  return (
    <Box sx={{ flexGrow: 1, width: '100%' }} >
      <AppBar position="fixed" sx={{ ...blurBackground }}>
        <Toolbar>
          <Typography component="div" color="text.primary" sx={{ flexGrow: 1, fontSize: "1rem" }}>
            <Link to={'/'}>
              <b>Board</b>
            </Link>
          </Typography>
          {children}

        </Toolbar>
      </AppBar>
    </Box>
  );
}

function ButtonBox({ isLogin }) {
  if (isLogin) {
    return (
      <Box sx={{ justifyContent: 'center' }}>
        <Link to={'/write'}>
          <Button variant="text" disableElevation><EditIcon sx={{ fontSize: "1.3rem"  }} /></Button>
        </Link>
        <Link to={'/profile'}>
          <Button variant="text" disableElevation>프로필</Button>
        </Link>

      </Box>
    );
  }

  return (
    <Box sx={{ justifyContent: 'center' }}>
      <Link to={'/auth/select'}>
        <Button variant="text" disableElevation>로그인 </Button>
      </Link>
    </Box>

  );
}



export default Navbar
export { ButtonBox }