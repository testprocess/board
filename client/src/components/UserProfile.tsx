import React, { useEffect, useState } from "react";
import { TextField, Button, Stack, Grid, Card, CardContent, Typography, Box, Skeleton, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { UserAPI, FeedAPI } from "../api";
import { FeedBody } from './Feed'


import Navbar, { ButtonBox } from './common/Navbar'
import { useSelector } from "react-redux";




function Profile() {
    const isLogin = useSelector((state: any) => state.auth.isLogin);

    const [userProfileId, setUserId] = useState('')
    const [content, setContent] = useState([{idx: 0, content:' ', owner: { userId: '11', userDisplayName: '11'}, date: '', type: 0}])


    const getUserData = async () => {
        const requestProfileId = location.pathname.split('@')[1]

        if (requestProfileId === '') {
            return goNotfoundPage()
        }

        const response = await UserAPI.get(requestProfileId)

        if (response.status == 0) {
            return goNotfoundPage()
        }

        setUserId(response.data.userDisplayName)
        getFeed(response.data.userId)
    }

    const getFeed = async (userId) => {
        const feed = await FeedAPI.getUserFeed(userId)

        setContent(feed.data.result)
    }

    const goNotfoundPage = () => {
        location.href = '/404'
    }

    useEffect(() => {
        getUserData()
    }, [])



    return (
        <Grid container sx={{ marginTop: "4rem" }} justifyContent="center" spacing={3}>
        <Navbar>
            <ButtonBox isLogin={isLogin}></ButtonBox>
        </Navbar>

        <Grid item xs={12} md={6}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    sx={{ marginBottom: '2rem' }}>
                    <Typography variant="h4">{userProfileId}</Typography>
                </Grid>

                {content.map(feed => (
                    <FeedBody feed={feed}></FeedBody>
                ))}
        </Grid>
    </Grid>

    );

}

export default Profile;