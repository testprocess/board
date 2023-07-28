
import React, { useEffect, useState } from "react";
import { TextField, Button, Stack, Grid, Card, CardContent, Typography, Box, Skeleton, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { Popup } from './Alert'
import { FeedBody } from './Feed'
import { useDispatch, useSelector } from 'react-redux';

import axios from "axios"
import Cookies from 'js-cookie'
import Navbar from './Navbar'


async function getFeed(idx) {
    let response = await axios.request({
        method: 'get',
        url: `/api/feeds/${idx}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        responseType: 'json'
    })


    return response.data
}

function FeedContent() {
    const dispatch = useDispatch();

    const isLogin = useSelector((state: any) => state.auth.isLogin);
    const userId = useSelector((state: any) => state.auth.userId);
    const [content, setContent] = useState([{idx: 0, content:'', owner: '', date: '', type: 1}])


    const fetchFeed = async () => {
        const feedIdx = Number(location.pathname.split('/')[2])
        const getFeedData = await getFeed(feedIdx)

        setContent([{...getFeedData.data.result[0]}])
    }

    useEffect(() => {
        fetchFeed()


    }, [])

    return (
        <Grid container spacing={3}>
            <Grid item xs md>
            </Grid>
            <Grid item xs={10} md={6} sx={{ marginTop: "6rem" }}>
                <Navbar></Navbar>

                {content.map(feed => (
                    <FeedBody feed={feed}></FeedBody>
                ))}

            </Grid>
            <Grid item xs md>
            </Grid>
        </Grid>
    );

}

export default FeedContent;