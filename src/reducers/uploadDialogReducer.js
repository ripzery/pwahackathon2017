import { TOGGLE_DIALOG } from '../actions/types'

const uploadDialogReducer = (state = false, action) => {
    switch (action.type) {
        case TOGGLE_DIALOG:
            return !state
        default: {
            return state
        }
    }
}

export default uploadDialogReducer;