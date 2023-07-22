import React, { useEffect, useState } from "react";
import dds from 'deventds/dist/handle'
import Cookies from 'js-cookie'
import { TextField, Button, Stack, Grid, Card, CardContent, Typography, Box, Skeleton, IconButton, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Popup } from './Alert'


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
    const [feeds, setFeeds] = useState([{idx: 0, content:'', owner: '', date: '', type: 0}])
    const [isLogin, setLoginStatus] = useState(false);
    const [fetching, setFetching] = useState(0);
    const [fetchingLock, setFetchingLock] = useState(false);
    const [fetchingStop, setFetchingStop] = useState(false);



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

    const handleScroll = (e) => {
        if (fetchingLock) {
            return 0
        }

        if (document.documentElement.scrollTop + document.documentElement.clientHeight + 100 > document.documentElement.scrollHeight) {
            setFetchingLock(true)
            setFetching( fetching + 10 )

            setTimeout(() => {
                setFetchingLock(false)

            }, 1000);
        }
    }
    

    useEffect(() => {
        let loginStatus = checkLogin()
        setLoginStatus(loginStatus.isVaild)
    }, []);

    useEffect(() => {
        if (!fetchingStop) {
            const loadData = async () => {
                let getFeeds = await getFeed(fetching, {
                    isrange: 'true',
                    range: 10,
                    order: "DESC"
                })
    
                if (getFeeds.data.result.length == 0) {
                    setFetchingStop(true)
                }
                setFeeds([...feeds, ...getFeeds.data.result])
            };
    
            loadData()  
        }
    }, [fetching])


    document.addEventListener('scroll', handleScroll)


    if (isLogin) {
        return (
            <Grid container spacing={3}>
                <Grid item xs md>
                </Grid>
                <Grid item xs={10} md={6}>
                    <FeedInput feed={{feeds, setFeeds}}></FeedInput>
                    {feeds.map(feed => (
                        <FeedBody feed={feed}></FeedBody>
                    ))}

                    <FeedSkeleton></FeedSkeleton>
                    <FeedSkeleton></FeedSkeleton>

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
                <FeedBody feed={feed}></FeedBody>

            ))}
            <FeedSkeleton></FeedSkeleton>

        </Grid>
        <Grid item xs md>
        </Grid>
        </Grid>
    );

}

function FeedInput(props) {
    const [input, setInput] = useState('')
    const [alertTrigger, setAlertTrigger] = useState(0)

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleClick = () => {
        if (input.length > 1000) {
            setAlertTrigger(alertTrigger + 1)
            return 0
        }

        if (input.length == 0) {
            return 0

        }
    
        props.feed.setFeeds([{idx: props.feed.feeds[0].idx + 1, content: input, owner: '', date: new Date()}, ...props.feed.feeds])

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
            <Typography sx={{ fontSize: "0.8rem", textAlign: 'right', color: input.length < 990 ? "#000000" : "#fc4242"  }}>{input.length}/1000</Typography>
            <Button variant="contained" onClick={handleClick}><SendIcon /> </Button>
            <Popup trigger={alertTrigger} message="길이가 너무 길어요" severity="info"></Popup>

        </Stack>
    );
}

function FeedBody({ feed }) {
    if (feed.type == 0) {
        return (
            <></>
        )
    }
    return (
        <Card sx={{ marginBottom: '1rem' }}>
            <CardContent>
                <FeedProfile feed={feed}></FeedProfile>

                <Box sx={{ fontSize: 14, whiteSpace: 'pre-line', wordWrap: 'break-word' }} color="text.secondary">
                    {feed.content}

                </Box>
            </CardContent>
        </Card>
    )
}

function FeedProfile({ feed }) {
    return (
        <Box sx={{ flexGrow: 1, overflow: 'hidden', marginBottom: "1rem" }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar sx={{ width: '2rem', height: '2rem', fontSize: '1rem' }}>{feed.owner.slice(0, 1)}</Avatar>
            </Grid>
            <Grid item xs zeroMinWidth sx={{ alignContent: 'center'}}>
              <Typography sx={{ fontSize: '1rem' }} noWrap>{feed.owner}</Typography>
            </Grid>
            <Grid item xs zeroMinWidth sx={{ justifyContent: 'flex-end',  }}>
              <Typography sx={{ textAlign: 'right'}} noWrap>
              <IconButton aria-label="delete" size="small">
              <MoreVertIcon sx={{ fontSize: '1.2rem' }}></MoreVertIcon>
                </IconButton>
</Typography>
            </Grid>
          </Grid>   
        </Box>
    )
}

function FeedSkeleton() {
    return (
        <Card sx={{ marginBottom: '1rem' }}>
            <CardContent>
                <Box sx={{ fontSize: 14, whiteSpace: 'pre-line', wordWrap: 'break-word' }} color="text.secondary">
                    <Skeleton variant="text" sx={{ fontSize: '2rem' }} />

                </Box>
            </CardContent>
        </Card>

    )
}
  
export default Feed;