import React, { useEffect, useRef, useState } from "react";
import { TextField, Button, Stack, Grid, Card, CardContent, Typography, Box, Skeleton, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { AlertDialog, Popup } from './common/Alert'
import { useDispatch, useSelector } from 'react-redux';
import { UserAPI } from "../api";
import { Link } from "react-router-dom"

import axios from "axios"
import Cookies from 'js-cookie'
import Navbar, { ButtonBox } from './common/Navbar'
import EditIcon from '@mui/icons-material/Edit';
import { toggleDarkmode } from "../features/appSlice";


import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';



function Profile() {
    const [dialogTrigger, setDialogTrigger] = useState(0)

    const userId = useSelector((state: any) => state.auth.userId);
    const isLogin = useSelector((state: any) => state.auth.isLogin);

    const handleWithdrawal = () => {
        UserAPI.remove(userId)
        document.cookie = 'user=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
        location.href = '/'
    }

    const handleClickLogout = () => {
        document.cookie = 'user=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
        location.href = '/'
    }

    const handleClickOpenWithdrawal = () => {
        setDialogTrigger( dialogTrigger + 1 )
    }


    return (
        <Grid container spacing={3}>
            <Grid item xs md>
            </Grid>
            <Grid item xs={10} md={6} sx={{ marginTop: "6rem" }}>
                <Navbar>
                    <ButtonBox isLogin={isLogin}></ButtonBox>

                </Navbar>

                <ProfileDisplayName></ProfileDisplayName>


                <ProfileBox title="앱 설정">
                    <SwitchColorMode></SwitchColorMode>
                    <br />

                    <Button onClick={handleClickLogout}>로그아웃</Button>
                </ProfileBox>


                <ProfileBox title="회원 설정">
                    <Button color="error" onClick={handleClickOpenWithdrawal}>회원탈퇴</Button>

                    <AlertDialog trigger={dialogTrigger} title="정말 회원을 탈퇴하실 건가요?">
                        <p>계정의 모든 정보가 사라지고 다시는 로그인할 수 없게 됩니다. 관련 사항을 숙지하고 탈퇴해주세요.</p>
                        <Button sx={{ width: "100%", marginTop: "2rem" }} variant="contained" color="error" onClick={handleWithdrawal}>네, 탈퇴할게요.</Button>
                    </AlertDialog>
                </ProfileBox>



            </Grid>
            <Grid item xs md>
            </Grid>
        </Grid>
    );

}


function ProfileBox({ title, children }: any) {
    return (
        <Box sx={{ marginTop: '2rem' }}>
            <b>{title}</b>
            <hr />
            {children}
        </Box>
    )
}

function SwitchColorMode() {
    const dispatch = useDispatch();
  
    const isDarkmode = useSelector((state: any) => state.app.isDarkmode);
  
    const toggleColorMode = () => {
      dispatch(toggleDarkmode({
        isDarkmode: isDarkmode == false ? true : false
      }))
    }
  
  
    return (
      <Button onClick={toggleColorMode} color="primary">
        {isDarkmode === true ? "라이트모드" : "다크모드" } {isDarkmode === true ? <Brightness7Icon sx={{ fontSize: "1.2rem", marginLeft: "0.5rem"  }} /> : <Brightness4Icon sx={{ fontSize: "1.2rem", marginLeft: "0.5rem"  }} />}
      </Button>
    )
  }
  

function ProfileDisplayName() {
    const [displayName, setDisplayName] = useState('')
    const [isEditUserName, setEditUserName] = useState(false)

    const isLogin = useSelector((state: any) => state.auth.isLogin);
    const userId = useSelector((state: any) => state.auth.userId);


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

    useEffect(() => {
        getDisplayName()
    }, [])

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