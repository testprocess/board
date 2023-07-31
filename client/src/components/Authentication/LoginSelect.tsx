import React, { useState } from "react";
import { Button, Box, Grid, TextField, Stack, Alert } from '@mui/material';
import { Link } from "react-router-dom"

import GoogleIcon from '@mui/icons-material/Google';

function LoginSelect() {

    const handleClickGoogleLogin = () => {
        location.href = '/api/auth/google'
    }


    return (
      <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}>

        <Box sx={{ justifyContent: 'center', textAlign: 'center' }}>

          <h5 className="card-title text-center mb-5 fw-light fs-5">로그인할 계정을 선택하세요</h5>


          <Stack spacing={2}>
            <Button variant="contained" onClick={handleClickGoogleLogin} disableElevation><GoogleIcon sx={{ marginRight: '0.6rem'}} /> 구글 계정으로 로그인 </Button>
                
            <Link to={'/auth/login'}><Button variant="text"  disableElevation>이메일로 로그인 </Button> </Link>
          </Stack>



        </Box>
      </Grid>

  
    );
}


  
  export default LoginSelect;