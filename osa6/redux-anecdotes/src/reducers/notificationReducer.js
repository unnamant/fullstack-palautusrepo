import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
    clearNotification() {
        return ''
    }
    }
})

const { setNotification, clearNotification } = notificationSlice.actions

export const setNotificationMessage = (message) => {
  return (dispatch) => {
    dispatch(setNotification(message))
    
    setTimeout(() => {
        dispatch(clearNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer