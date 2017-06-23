import {SIGN_IN_GOOGLE, SIGN_OUT_GOOGLE} from '../actions/types'

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case SIGN_IN_GOOGLE:
            return action.user;
        case SIGN_OUT_GOOGLE:
            return null
        default:
            return state;
    }
};

export default userReducer