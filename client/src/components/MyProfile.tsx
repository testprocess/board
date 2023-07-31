import React, { useEffect, useRef, useState } from "react";
import { TextField, Button, Stack, Grid, Card, CardContent, Typography, Box, Skeleton, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { Popup } from './Alert'
import { useDispatch, useSelector } from 'react-redux';
import { UserAPI } from "../api";

import axios from "axios"
import Cookies from 'js-cookie'
import Navbar from './Navbar'
import EditIcon from '@mui/icons-material/Edit';


function Profile() {

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
                <Navbar>
                    <Button onClick={handleClickLogout}>로그아웃</Button>

                </Navbar>

                <ProfileDisplayName></ProfileDisplayName>


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


function ProfileDisplayName() {
    const [displayName, setDisplayName] = useState('')
    const [isEditUserName, setEditUserName] = useState(false)

    const isLogin = useSelector((state: any) => state.auth.isLogin);
    const userId = useSelector((state: any) => state.auth.userId);

    useEffect(() => {
        getDisplayName()
    }, [])

    const handleChangeDisplayName = (e) => {
        setDisplayName(e.target.value)

    }

    const handleClickEditButton = () => {
        const toggleEditUserName = isEditUserName == false ? true : false
        setEditUserName(toggleEditUserName)
    }

    
    const handleSubmitDisplayName = (e) => {
        if (e.key != 'Enter') {
            return 0
        }

        sendDisplayName()
    }

    const sendDisplayName = () => {
        UserAPI.update({ displayName: displayName })
        handleClickEditButton()
    }

    const getDisplayName = async () => {
        const userData = await UserAPI.get(userId)
        setDisplayName( userData.data.userDisplayName)
    }


    return (
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center">
        <Typography sx={{ display: isEditUserName == true ? "none" : "block" }} variant="h4">{displayName}</Typography>
        <TextField 
            sx={{ display: isEditUserName == true ? "block" : "none" }} 
            id="outlined-basic" 
            label="이름 변경" 
            variant="outlined" 
            name="displayName"  
            value={displayName} 
            onKeyDown={handleSubmitDisplayName}
            onChange={handleChangeDisplayName}
            InputProps={{endAdornment: <Button onClick={sendDisplayName}><EditIcon /></Button>}}
        />

        <Button sx={{ display: isEditUserName == true ? "none" : "block" }}  onClick={handleClickEditButton}><EditIcon /></Button>

        

        </Grid>
    )
}

export default Profile;