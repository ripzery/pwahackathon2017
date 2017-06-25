import {TOGGLE_SUBSCRIBE_DIALOG} from '../actions/types';

const subscribeDialogReducer = (state = false, action) => {
    switch (action.type) {
        case TOGGLE_SUBSCRIBE_DIALOG:
            return !state;
        default:
            return state;
    }
};

export default subscribeDialogReducer;