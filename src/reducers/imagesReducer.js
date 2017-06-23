import { ADD_IMAGES, CLEAR_IMAGES } from '../actions/types';

const addImagesReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_IMAGES: {
            return [
                ...state,
                ...action.images
            ]
        }
        case CLEAR_IMAGES: {
            return []
        }
        default: {
            return state;
        }
    }
}

export default addImagesReducer