import { ADD_IMAGES, TOGGLE_DIALOG, CLEAR_IMAGES, SET_VISIBILITY_ADD, SIGN_IN_GOOGLE, SIGN_OUT_GOOGLE } from './types';

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

const signInWithGoogle = (user) => ({
    type: SIGN_IN_GOOGLE,
    user: user //email, photoURL, displayName
})

const signOut = () => ({
    type: SIGN_OUT_GOOGLE
})

export {
    addImages,
    toggleDialog,
    clearImages,
    setVisibilityAdd,
    signInWithGoogle,
    signOut
}