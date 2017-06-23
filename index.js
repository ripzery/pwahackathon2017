import { ADD_IMAGES, TOGGLE_DIALOG, CLEAR_IMAGES, SET_VISIBILITY_ADD } from './types';

const addImages = (images) => ({
    type: ADD_IMAGES,
    images,
});

const clearImages = () => ({
    type: CLEAR_IMAGES
})

const toggleDialog = () => ({
    type: TOGGLE_DIALOG,
})

const setVisibilityAdd = (is_opened) => ({
    type: SET_VISIBILITY_ADD,
    add_opened: is_opened,
})

export {
    addImages,
    toggleDialog,
    clearImages,
    setVisibilityAdd,
}