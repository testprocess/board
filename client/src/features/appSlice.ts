
import { createSlice } from '@reduxjs/toolkit'

type state = {
    isDarkmode: boolean
}

const initialState: state = {
    isDarkmode: false,
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleDarkmode(state, action) {
            state.isDarkmode = action.payload.isDarkmode
        }
    }
})

export const { toggleDarkmode } = appSlice.actions
export default appSlice.reducer