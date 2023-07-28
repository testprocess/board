import React, { useEffect, useState } from "react";
import { TextField, Button, Stack, Grid, Card, CardContent, Typography, Box, Skeleton, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { Popup } from './Alert'
import { useDispatch, useSelector } from 'react-redux';

import axios from "axios"
import Cookies from 'js-cookie'
import Navbar from './Navbar'


async function getUser(userId) {    
    let response = await axios.request({
        method: 'get',
        url: `/api/users/${userId}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        responseType: 'json'
    })

    return response.data
}

function Profile() {
    const [userProfileId, setUserId] = useState('')


    const getUserData = async () => {
        const requestProfileId = location.pathname.split('/')[2]

        if (requestProfileId === '') {
            return goNotfoundPage()
        }

        const response = await getUser(requestProfileId)

        if (response.status == 0) {
            return goNotfoundPage()
        }

        setUserId(response.data.user_id)
    }

    const goNotfoundPage = () => {
        location.href = '/404'
    }

    useEffect(() => {
        getUserData()
    }, [])


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
                    <Typography variant="h4">{userProfileId}</Typography>

                </Grid>

            </Grid>
            <Grid item xs md>
            </Grid>
        </Grid>
    );

}

export default Profile;