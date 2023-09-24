import React, { useEffect, useState } from "react";
import { TextField, Button, Stack, Grid, Card, CardContent, Typography, Box, Skeleton, IconButton, Avatar, Menu, MenuItem, InputAdornment } from '@mui/material';
import { Popup, AlertDialog } from './common/Alert'
import { useDispatch, useSelector } from 'react-redux';
import { push, unshift, remove, clear } from '../features/feedSlice';
import { Link } from "react-router-dom"
import { FeedAPI } from "../api";

import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';


function Feed() {
    const dispatch = useDispatch();

    const isLogin = useSelector((state: any) => state.auth.isLogin);
    const feeds = useSelector((state: any) => state.feed.feeds);

    const [fetching, setFetching] = useState(0);
    const [fetchingLock, setFetchingLock] = useState(false);
    const [fetchingStop, setFetchingStop] = useState(false);

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

    const loadFeedData = async () => {
        let getFeeds = await FeedAPI.getFeed(fetching, {
            isrange: 'true',
            range: 10,
            order: "DESC"
        })

        if (getFeeds.data.result.length == 0) {
            setFetchingStop(true)
        }

        for (let index = 0; index < getFeeds.data.result.length; index++) {
            const element = getFeeds.data.result[index];

            dispatch(push({
                idx: element.idx, 
                content: element.content, 
                owner: element.owner, 
                date: element.date, 
                type: element.type, 
            }))
        }
    };

    useEffect(() => {
        dispatch(clear({}))

    }, [])

    

    useEffect(() => {
        if (!fetchingStop) {
            dispatch(clear({}))
            loadFeedData()  
        }
    }, [fetching])


    document.addEventListener('scroll', handleScroll)

    const feedsResult = feeds.map(feed => (
        <FeedBody feed={feed}></FeedBody>

    ))

    if (isLogin) {
        return (
            <Grid container sx={{ marginTop: "1rem" }} justifyContent="center" spacing={3}>
                <Grid item xs={12} md={6}>
                    <FeedInput></FeedInput>

                    {feedsResult}
                    <FeedSkeleton></FeedSkeleton>
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid container sx={{ marginTop: "1rem" }} justifyContent="center" spacing={3}>
            <Grid item xs={12} md={6}>
                {feedsResult}
                <FeedSkeleton></FeedSkeleton>
            </Grid>
        </Grid>
    );

}


function FeedInput(props) {
    const dispatch = useDispatch();

    const userId = useSelector((state: any) => state.auth.userId);
    const feeds = useSelector((state: any) => state.feed.feeds);

    const [input, setInput] = useState('')
    const [isAlertOpen, setAlertOpen] = useState(false)
    const [isAlertOpenSuccess, setAlertOpenSuccess] = useState(false)


    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleClick = () => {
        if (input.length > 1000) {
            setAlertOpen(true)
            setTimeout(() => {
                setAlertOpen(false)
            }, 100)
            return 0
        }

        if (input.length == 0) {
            return 0
        }
    
        FeedAPI.insertFeed(input)
        setInput('')

        setAlertOpenSuccess(true)
        setTimeout(() => {
            setAlertOpenSuccess(false)
        }, 100)
        

        setTimeout(() => {
            patchFeed()

        }, 500)
    }

    const patchFeed = async () => {
        const getFeeds = await FeedAPI.getFeed(0, {
            isrange: 'true',
            range: 1,
            order: "DESC"
        })


        dispatch(unshift({
            idx: getFeeds.data.result[0].idx, 
            content: getFeeds.data.result[0].content, 
            owner: getFeeds.data.result[0].owner, 
            date: getFeeds.data.result[0].date, 
            type: getFeeds.data.result[0].type 
        }))

    }
    

    return (
        <Stack sx={{ marginTop: "1rem", marginBottom: "2rem" }} spacing={1}>
            <TextField
                id="outlined-textarea"
                label="Feed"
                placeholder="input text..." 
                onChange={handleChange} 
                value={input}
                multiline
            />
            <Typography sx={{ fontSize: "0.8rem", textAlign: 'right', color: input.length < 990 ? "text.primary" : "#fc4242"  }}>{input.length}/1000</Typography>
            <Button variant="contained" onClick={handleClick} disableElevation><SendIcon /> </Button>
            <Popup isOpen={isAlertOpen} message="길이가 너무 길어요" severity="info"></Popup>
            <Popup isOpen={isAlertOpenSuccess} message="성공적으로 게시했어요" severity="success"></Popup>

        </Stack>
    );
}


function FeedBody({ feed }) {
    if (feed.type == 0) {
        return (
            <></>
        )
    }

    const [lineNumbers, setLineNumbers] = useState(feed.content.split(/\r\n|\r|\n/).length + Math.ceil(feed.content.length / 60))


    const splitLines = () => {
        const lines = feed.content.split(/\r\n|\r|\n/).map((c) => { 
            let content = c.match(/.{1,60}/g)
            return content == null ? '' : content
        })

        const linesArray = lines.map((c) => {
            return Array.isArray(c) ? c.join('') : c[0]
        })

        return linesArray
    }

    const splitContent = () => {
        const lines = splitLines().slice(0, 30).join('\n')
        return lines
    }

    return (
        <Card variant="outlined" sx={{ marginBottom: '1rem' }}>
            <CardContent>
                <FeedProfile feed={feed}></FeedProfile>

                <Box sx={{ fontSize: 14, whiteSpace: 'pre-line', wordWrap: 'break-word' }} color="text.secondary">
                    {lineNumbers < 30 ? (
                        <FeedContent isMore={false} feed={feed}>{feed.content}</FeedContent>
                    ) : (
                        <FeedContent isMore={true} feed={feed}>{splitContent()}...</FeedContent>
                    )}
                    
                </Box>
            </CardContent>
        </Card>
    )
}


function FeedContent({ isMore, feed, children }) {
    const [content, setContent] = useState(children)
    const [isClickMoreButton, setIsClick] = useState(false)

    const showMore = () => {
        setContent(feed.content)
        setIsClick(true)
    }

    if (isMore) {
        return (
            <Box onClick={showMore} sx={{ cursor: isClickMoreButton ? '' : 'pointer' }}>
                {content}
                {isClickMoreButton ? (
                    <></>
                ) : (
                    <b>(더보기)</b>
                )}
            </Box>
        )
    }

    return (
        <>{content}</>
    )
}


function FeedProfile({ feed }) {
    const dateSplit = feed.date.split('.')


    return (
        <Box sx={{ flexGrow: 1, overflow: 'hidden', marginBottom: "1rem", alignContent: 'center' }}>
            <Grid container wrap="nowrap" spacing={2} sx={{ alignContent: 'center', alignItems: 'center' }}>
                <Grid item>
                    <Link to={'/@' + feed.owner.userId}>
                        <Avatar sx={{ width: '2rem', height: '2rem', fontSize: '1rem' }}>{feed.owner.userDisplayName.slice(0, 1)}</Avatar>

                    </Link>
                </Grid>

                <Grid item xs zeroMinWidth sx={{ alignContent: 'center'}}>
                <Link to={'/@' + feed.owner.userId}>
                <Typography sx={{ fontSize: '1rem' }} noWrap>{feed.owner.userDisplayName}</Typography>

                </Link>
                    <Typography sx={{ fontSize: '0.7rem' }} color="text.secondary" noWrap>{new Date(dateSplit[0], dateSplit[1], dateSplit[2], dateSplit[3], dateSplit[4], dateSplit[5]).toDateString()}</Typography>

                </Grid>
                <Grid item xs zeroMinWidth sx={{ justifyContent: 'flex-end',  }}>
                    <Typography sx={{ textAlign: 'right'}} noWrap>
                        <FeedMenu feed={feed}></FeedMenu>
                    </Typography>
                </Grid>
            </Grid>   
        </Box>
    )
}


function FeedMenu({ feed }) {
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isPopupOpen, setPopupOpen] = useState(false)
    const [alertDialogTrigger, setAlertDialogTrigger] = useState(0)

    const isLogin = useSelector((state: any) => state.auth.isLogin);
    const userId = useSelector((state: any) => state.auth.userId);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleDelete = async () => {
        const deleteThisFeed = await FeedAPI.deleteFeed(feed.idx)

        dispatch(remove({
            idx: feed.idx
        }))

        if (deleteThisFeed.status == 1) {
            setPopupOpen(true)
            setTimeout(() => {
                setPopupOpen(false)
            }, 100)
        }

        handleClose()
    }

    const handleShowInfo = () => {
        setAlertDialogTrigger(alertDialogTrigger + 1)
        handleClose()
    }

    return (
        <>
        <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick} 
        aria-label="delete" 
        size="small">
            <MoreVertIcon sx={{ fontSize: '1.2rem' }}></MoreVertIcon>
        </IconButton>

        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}>

            <MenuItem color="primary" onClick={handleShowInfo}>info</MenuItem>

            {(isLogin && feed.owner.userId == userId) ? (
                <MenuItem sx={{ color: "#e64840" }} onClick={handleDelete}>delete</MenuItem>
               
            ) : (
                <></>
            )}
        </Menu>

        <Popup isOpen={isPopupOpen} message="삭제 완료" severity="success"></Popup>

        <AlertDialog trigger={alertDialogTrigger} title="피드 정보">
            <p>{feed.date}</p>
            <TextField
                label="주소"
                sx={{ m: 1, width: '25ch' }}
                defaultValue={location.origin + '/feed/' + feed.idx}

                InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                }}/>
        </AlertDialog>
        </>

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
export { FeedBody }