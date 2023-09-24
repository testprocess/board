
import { createSlice } from '@reduxjs/toolkit'

type FeedObject = {
    idx: number
    content: string
    owner: {
        userId: string
        userDisplayName: string
    }
    date: string
    type: number
}

type state = {
    feeds: FeedObject[]
}

const initialState: state = {
    feeds: []
}

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        push(state, action) {
            state.feeds.push(action.payload)
        },
        unshift(state, action) {
            state.feeds.unshift(action.payload)
            console.log(state.feeds, initialState)
        },
        clear(state, action) {
            state.feeds = []
        },
        remove(state, action) {
            const feedWithIdx = state.feeds.findIndex((obj) => obj.idx === action.payload.idx);
          
            if (feedWithIdx > -1) {
                state.feeds.splice(feedWithIdx, 1);
            }
        },
    }
})

export const { push, unshift, clear, remove } = feedSlice.actions
export default feedSlice.reducer