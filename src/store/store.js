import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import notificationReducer from '../middleware/notification/store/notificationSlice'
import menuSlice from '../components/MenuList/store/dataslice'

let middlewares = []
if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({
        collapsed: (getState, action, logEntry) => !logEntry.error,
    })
    middlewares.push(logger)
}
export default configureStore({
    reducer: {
        notification: notificationReducer,
        menuItems:menuSlice
    },
    middleware: (getDefaultMiddleware) =>
            
        getDefaultMiddleware({serializableCheck:false}),
    devTools: process.env.NODE_ENV !== 'production',
})
