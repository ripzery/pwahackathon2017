import { combineReducers } from 'redux';
import imagesReducer from './imagesReducer';
import uploadDialogReducer from './uploadDialogReducer'
import addReducer from './addReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    images: imagesReducer,
    upload_dialog_opened: uploadDialogReducer,
    addReducer: addReducer,
    userReducer: userReducer
})

export default rootReducer;