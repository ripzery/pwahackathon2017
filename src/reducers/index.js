import { combineReducers } from 'redux';
import imagesReducer from './imagesReducer';
import uploadDialogReducer from './uploadDialogReducer'
// import {routerStateReducer} from 'redux-router'
import addReducer from './addReducer'
import userReducer from './userReducer'
import subscribeDialogReducer from './subscribeDialogReducer'
import notificationReducer from './notificationReducer'

const rootReducer = combineReducers({
    // router: routerStateReducer,
    images: imagesReducer,
    dialog_opened: uploadDialogReducer,
    subscribe_dialog_opened: subscribeDialogReducer,
    addReducer: addReducer,
    userReducer: userReducer,
    notification: notificationReducer
})

export default rootReducer;