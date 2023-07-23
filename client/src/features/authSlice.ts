
import { createSlice } from '@reduxjs/toolkit'

type state = {
    isLogin: boolean
    userId: string
}

const initialState: state = {
    isLogin: false,
    userId: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        changeIsLogin(state, action) {
            state.isLogin = action.payload.isLogin
        },
        updateUserId(state, action) {
            state.userId = action.payload.userId
        }
    }
})

export const { changeIsLogin, updateUserId } = authSlice.actions
export default authSlice.reducer