import React, { useEffect, useState } from "react";
import { TextField, Button, Stack, Grid, Card, CardContent, Typography, Box, Skeleton, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { Popup } from './Alert'
import { useDispatch, useSelector } from 'react-redux';
import { UserAPI } from "../api";

import axios from "axios"
import Cookies from 'js-cookie'
import Navbar from './Navbar'



function Profile() {
    const isLogin = useSelector((state: any) => state.auth.isLogin);
    const userId = useSelector((state: any) => state.auth.userId);

    const handleWithdrawal = () => {
        UserAPI.remove(userId)
        document.cookie = 'user=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
        location.href = '/'
    }

    const handleClickLogout = () => {
        document.cookie = 'user=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
        location.href = '/'
    }


    return (
        <Grid container spacing={3}>
            <Grid item xs md>
            </Grid>
            <Grid item xs={10} md={6} sx={{ marginTop: "6rem" }}>
                <Navbar></Navbar>

                
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center">
                    <Typography variant="h4">{userId}</Typography>
                    <Button sx={{ marginTop: "1rem" }} onClick={handleClickLogout}>로그아웃</Button>

                </Grid>



                <br />
                <b>회원 설정</b>
                <hr />


                <br />


                <Button sx={{ color: "#d12828" }} onClick={handleWithdrawal}>회원탈퇴</Button>

            </Grid>
            <Grid item xs md>
            </Grid>
        </Grid>
    );

}

export default Profile;