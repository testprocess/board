import React, { useState, useEffect } from "react";
import { Button, Box, Grid } from '@mui/material';
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux';
import { changeIsLogin, updateUserId } from '../features/authSlice';
import Navbar from './Navbar'

function Main() {
    const [isLogin, setLoginStatus] = useState(0);
    const dispatch = useDispatch();

    const checkLogin = () => {
        let token = Cookies.get("user")
        try {
            let decoded = JSON.parse(atob(token.split('.')[1]));
            return {
                isVaild: 1,
                decoded: decoded
            }
        } catch (error) {
            return {
                isVaild: 0
            }
        }
    }

    useEffect(() => {
        let loginStatus = checkLogin()
        dispatch(changeIsLogin({
            isLogin: loginStatus.isVaild == 1 ? true : false
        }))

        if (loginStatus.isVaild == 1) {
            dispatch(updateUserId({
                userId: loginStatus.decoded.user_id
            }))
        }

        setLoginStatus(loginStatus.isVaild)
    }, []);


    return (
        <Grid container sx={{ marginTop: "3rem" }} spacing={3}>
            <Navbar>
                <ButtonBox isLogin={isLogin}></ButtonBox>
            </Navbar>

        <Grid item xs md>
        </Grid>
        <Grid item xs={10} md={6}>
        
            <Box sx={{ display: 'grid', marginBottom: "2rem", marginTop: "3rem" }}>
                <Box sx={{ justifyContent: 'center', textAlign: 'center' }}>
                    <h1>단순 게시판이 아닌데요</h1>
                    <p>환영합니다. 이 게시판은 실험용 게시판 입니다. 글이 언제든지 삭제될 수 있고 서버가 날라갈 우려도 있습니다. </p>
                </Box>

                <Box sx={{ justifyContent: 'center', textAlign: 'center' }}>
                    
                </Box>

            </Box>
        </Grid>
        <Grid item xs md>
        </Grid>
        </Grid>

    );
}


function ButtonBox({ isLogin }) {
    const handleClickSignup = () => {
        location.href = '/auth/signup'
    }

    const handleClickLogin = () => {
        location.href = '/auth/login'
    }

    const handleClickLogout = () => {
        document.cookie = 'user=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
        location.href = '/'
    }

    if (isLogin) {
        return (
            <Box sx={{ justifyContent: 'center' }}>
                <Button variant="contained" onClick={handleClickLogout} disableElevation>로그아웃</Button>

            </Box>

        );
    }

    return (
        <Box sx={{ justifyContent: 'center' }}>
            <Button sx={{ marginRight: '0.8rem' }} variant="contained" onClick={handleClickSignup} disableElevation>가입 </Button>
            <Button variant="contained" onClick={handleClickLogin} disableElevation>로그인 </Button>
        </Box>

    );
}
  
export default Main;