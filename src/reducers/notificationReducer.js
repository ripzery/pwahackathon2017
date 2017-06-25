import {SHOW_NOTIFICATION, HIDE_NOTIFICATION} from '../actions/types'

const notificationReducer = (state = {isShow: false, message: 'Empty', isError: false}, action) => {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return {
                isShow: true,
                message: action.message,
                isError: action.isError
            }
        case HIDE_NOTIFICATION:
            return {
                isShow: false,
                message: 'Empty',
                isError: false
            }
        default:
            return state;
    }
};

export default notificationReducer