import React, { useEffect, useState } from "react";
import dds from 'deventds/dist/handle'
import Cookies from 'js-cookie'
import { TextField, Button, Stack, Grid, Card, CardContent, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

async function getFeed(feed_idx, fetch_params) {
    let token = Cookies.get("user")

    let params = fetch_params || {}
    let params_string = new URLSearchParams(params).toString();

    let response = await fetch(`/api/feeds/${feed_idx}?${params_string}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": token
        }
    });

    let data = response.json();
    return data;
}

async function insertFeed(content) {
    let token = Cookies.get("user")

    let response = await fetch("/api/feeds", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": token
        },
        body: `content=${content}`
    });

    let data = response.json();
    return data;
}


// async  delete(idx) {
//     let response = await fetch("/api/feeds/"+idx, {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             "x-access-token": this.token
//         }
//     });

//     let data = response.json();
//     return data;
// }

// async update(idx, content) {
//     let response = await fetch("/api/feeds/"+idx, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             "x-access-token": this.token
//         },
//         body :`content=${content}`
//     });

//     let data = response.json();
//     return data;
// }

function Feed() {
    const [feeds, setFeeds] = useState([{idx: 0, content:'', owner: '', date: ''}])
    const [isLogin, setLoginStatus] = useState(false);

    const checkLogin = () => {
        let token = Cookies.get("user")
        try {
            let decoded = JSON.parse(atob(token.split('.')[1]));
            return {
                isVaild: true,
                decoded: decoded
            }
        } catch (error) {
            return {
                isVaild: false
            }
        }
    }

    useEffect(() => {
        let loginStatus = checkLogin()
        setLoginStatus(loginStatus.isVaild)
    }, []);

    useEffect(() => {
        const loadData = async () => {
            let feeds = await getFeed(1, {
                isrange: 'true',
                range: 20
            })
            setFeeds(feeds.data.result)
            console.log(feeds)
        };

        loadData()
    }, [])

    if (isLogin) {
        return (
            <Grid container spacing={3}>
            <Grid item xs md>
            </Grid>
            <Grid item xs={10} md={6}>
                <FeedInput></FeedInput>
                {feeds.map(feed => (
                    <div>
                        <FeedBody><b>{feed.owner}</b>  {feed.content}</FeedBody>
                        
                    </div>
                ))}
            </Grid>
            <Grid item xs md>
            </Grid>
            </Grid>
        );
    }

    return (
        <Grid container sx={{ marginTop: "1rem" }} spacing={3}>
        <Grid item xs md>
        </Grid>
        <Grid item xs={10} md={6}>
            {feeds.map(feed => (
                <div>
                    <FeedBody> <b>{feed.owner}</b> {feed.content}</FeedBody>
                    
                </div>
            ))}
        </Grid>
        <Grid item xs md>
        </Grid>
        </Grid>
    );

}

function FeedInput() {
    const [input, setInput] = useState('')

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleClick = () => {
        insertFeed(input)
        setInput('')

    }

    return (
        <Stack sx={{ marginTop: "1rem", marginBottom: "1rem" }} spacing={1}>
            <TextField
                id="outlined-textarea"
                label="Feed"
                placeholder="input text..." 
                onChange={handleChange} 
                value={input}
                multiline
            />
            <Button variant="contained" onClick={handleClick}><SendIcon /> </Button>

        </Stack>
    );
}

function FeedBody({ children }) {
    return (
        <Card sx={{ minWidth: 275, marginBottom: '1rem' }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {children}

                </Typography>
            </CardContent>
        </Card>
    )
}
  
export default Feed;