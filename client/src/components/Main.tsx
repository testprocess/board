import React, { useState, useEffect } from "react";
import { Button, Box } from '@mui/material';
import Cookies from 'js-cookie'

function Main() {
    const [isLogin, setLoginStatus] = useState(0);

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
        setLoginStatus(loginStatus.isVaild)
    }, []);


    return (
        <Box sx={{ display: 'grid' }}>
            <Box sx={{ justifyContent: 'center', textAlign: 'center' }}>
                <h1 >더 모던하고 깔끔한 게시판의 세계로</h1>
                <p >Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit!</p>
            </Box>

            <Box sx={{ justifyContent: 'center', textAlign: 'center' }}>
                <ButtonBox isLogin={isLogin}></ButtonBox>
            </Box>

        </Box>
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
                <Button variant="contained" onClick={handleClickLogout}>로그아웃</Button>

            </Box>

        );
    }

    return (
        <Box sx={{ justifyContent: 'center' }}>
            <Button sx={{ marginRight: '0.8rem' }} variant="contained" onClick={handleClickSignup}>가입 </Button>
            <Button variant="contained" onClick={handleClickLogin}>로그인 </Button>
        </Box>

    );
}
  
export default Main;