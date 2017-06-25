import {TOGGLE_CONNECTIVITY} from '../actions/types'
const connectivityReducer = (state = true, action) => {
    switch (action.type) {
        case TOGGLE_CONNECTIVITY:
            return action.connected;
        default:
            return state;
    }
};

export default connectivityReducer