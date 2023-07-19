import React, { useState } from "react";
import dds from 'deventds/dist/handle'
import { Button, Box, Grid, TextField, Stack, Alert } from '@mui/material';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

import Cookies from 'js-cookie'

function Login() {
  const [openAlert, setOpenAlert] = React.useState(true);

  const [inputs, setInputs] = useState({
    userId: '',
    userPw: ''
  });

  const { userId, userPw } = inputs;



  async function login() {
    let user_id = btoa(userId);
    let user_pw = btoa(userPw);
        
    let response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `user_id="${user_id}"&user_pw="${user_pw}"`
    });

    let data = await response.json();

    if (data.status == 1) {
        Cookies.set('user', data.token)
        dds.toast({
            content: '로그인에 성공했어요'
        })

        setTimeout(() => {
            location.href = '/'
        }, 1400);
    } else if (data.status == -1) {
        dds.toast({
            content: '탈퇴한 회원이거나 권한이 없어요'
        })
    } else {
        dds.toast({
            content: '로그인 정보가 맞지 않아요'
        })
    } 
}


  const handleClickLogin = () => {
    login()
  }

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };

    return (
      <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}>

        <Box sx={{ justifyContent: 'center', textAlign: 'center' }}>

          <h5 className="card-title text-center mb-5 fw-light fs-5">프레임 로그인</h5>

          <Stack spacing={2} sx={{ marginBottom: '1rem' }}>
            <TextField type="text" label="Id" variant="outlined" placeholder="User ID" name="userId" onChange={onChange} value={userId} required autoFocus />
            <TextField type="password" label="Password" variant="outlined" placeholder="Password" name="userPw" onChange={onChange} value={userPw} required />

          </Stack>

          <Stack spacing={1}>
            <Button variant="contained" onClick={handleClickLogin}>로그인 </Button>
            <Button variant="text" href="/auth/signup">빠른 회원가입 </Button>

          </Stack>


          <Snackbar
            open={openAlert}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            
          >
            <Alert severity="success" sx={{ width: '100%' }}>
              This is a success message!
            </Alert>
          </Snackbar>

        </Box>
      </Grid>

  
    );
  }
  
  export default Login;