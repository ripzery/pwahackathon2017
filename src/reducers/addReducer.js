import { SET_VISIBILITY_ADD } from '../actions/types'

export default (state = true, action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_ADD':
            return action.add_opened;
        default:
            return state;
    }
};