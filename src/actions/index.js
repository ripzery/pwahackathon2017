import { ADD_IMAGES, TOGGLE_DIALOG, CLEAR_IMAGES, SET_VISIBILITY_ADD, SIGN_IN_GOOGLE, SIGN_OUT_GOOGLE, SHOW_NOTIFICATION, HIDE_NOTIFICATION, TOGGLE_SUBSCRIBE_DIALOG, TOGGLE_CONNECTIVITY } from './types';

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

const toggleSubscribeDialog = () => ({
    type: TOGGLE_SUBSCRIBE_DIALOG,
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

const showNotification = (message, isError = false, isDialog = false) => ({
    type: SHOW_NOTIFICATION,
    isDialog:  isDialog,
    message: message,
    isError: isError,
    isShow: true
})

const hideNotification = () => ({
    type: HIDE_NOTIFICATION,
    isShow: false,
    isError: false
})

const toggleConnectivity = (connected) => ({
    type: TOGGLE_CONNECTIVITY,
    connected: connected
})

export {
    addImages,
    toggleDialog,
    clearImages,
    setVisibilityAdd,
    signInWithGoogle,
    signOut,
    showNotification,
    hideNotification,
    toggleSubscribeDialog,
    toggleConnectivity
}