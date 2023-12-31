import React, { useState, useEffect } from "react";
import { Button, Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"

import Navbar, { ButtonBox } from './common/Navbar'

function Main() {
    const isLogin = useSelector((state: any) => state.auth.isLogin);

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
                    <h1>단순 게시판이 아닌데</h1>
                    <p>환영합니다. 이 게시판은 실험용 게시판 입니다. 글이 언제든지 삭제될 수 있고 서버가 날라갈 우려도 있습니다. DeVent-Frame 프로젝트의 다음 버전 입니다.</p>
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



export default Main;