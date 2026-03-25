import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.payload
        case 'CLEAR_NOTIFICATION':
            return ''
        default:
            return state
    }
}

const NotificationContext = createContext()

let timeoutID = null

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  const showNotification = (message) => {
    if (timeoutID) {
        clearTimeout(timeoutID)
    }

    notificationDispatch({ type: 'SET_NOTIFICATION', payload: message })

    timeoutID = setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
        timeoutID = null
    }, 5000)
  }

  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch, showNotification }}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext