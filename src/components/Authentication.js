import React, { Component } from 'react';
import firebase from 'firebase'
const googleSignInProvider = new firebase.auth.GoogleAuthProvider();

class Authentication extends Component {
    constructor(props) {
        super();
        this.state = {
            user: firebase.auth().currentUser
        }
        this.auth = firebase.auth();
        this.handleSignIn = this.handleSignIn.bind(this)
        this.handleSignOut = this.handleSignOut.bind(this)
        this.onAuthStateChanged = this.onAuthStateChanged.bind(this)
        this.saveMessagingDeviceToken = this.saveMessagingDeviceToken.bind(this)
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    }

    handleSignIn() {
        this.auth.signInWithPopup(googleSignInProvider)
    }

    componentWillUnmount() {
        firebase.auth().onAuthStateChanged(null);
    }

    handleSignOut() {
        console.log('click signout')
        this.auth.signOut();
    }

    onAuthStateChanged(user) {
        this.props.update()
        if (user) { // User is signed in
            // TODO: Implement save device token to firebase realtime database fcmTokens
            console.log('User is signed-in', user)
            this.setState({
                user: {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                }
            }, () => this.props.signInWithGoogle(this.state.user))

            //Save device token
            this.saveMessagingDeviceToken();
        } else { // User is signed out
            console.log('User is signed out')
            this.setState({
                user: null
            }, () => this.props.signOut())
        }
    }

    saveMessagingDeviceToken() {
        firebase.messaging().getToken().then((currentToken) => {
            if (currentToken) {
                console.log('Got FCM device token:', currentToken)
                localStorage.setItem('fcm_token', currentToken);

                let fcmTokens =  firebase.database().ref(`fcmTokens/${firebase.auth().currentUser.uid}/tokens`).once('value').then((snapshot) => {
                    let allDeviceTokens = snapshot.val();
                    if(!snapshot.val()){
                        allDeviceTokens = [];   
                    }else if(allDeviceTokens.indexOf(currentToken) > -1) {
                        return;
                    }
                    console.log('Received allDeviceTokens', allDeviceTokens)
                    firebase.database().ref(`fcmTokens/${firebase.auth().currentUser.uid}/tokens/`)
                        .set([...allDeviceTokens, currentToken]).then(() => { console.log('Update device token of user', firebase.auth().currentUser.uid) });
                });
                    

                // // TODO: read all subscribe topics all resubscribe
                // console.log('read all tags for subscribe.')
                // firebase.database().ref(`/subscription/${firbase.auth().currentUser.uid}/tags`).once('value').then((snapshot) =>{
                //     if(!snapshot || !snapshot.val()) return;

                //     let tags = snapshot.val();
                //     console.log(tags)

                    
                    
                // })
            } else {
                // Need to request permissions to show notifications.
                console.log('Requesting notifications permission...')
                firebase.messaging().requestPermission().then(() => {
                    this.saveMessagingDeviceToken();
                })
            }
        }).catch(error => {
            console.error('Unable to get messaging token.', error);
        })
    }

    render() {
        const SignIn = <div>
            <a className="button is-info" style={{ marginTop: 8 }} onClick={this.handleSignIn}>Sign-in with Google <i className="fa fa-google" style={{ marginLeft: 8 }} aria-hidden="true"></i></a>
        </div>
        const SignOut =
            <div className='nav-item is-tab' onClick={this.handleSignOut}>
                <figure className="image is-32x32" style={{ marginRight: 8 }}>
                    <img src={!this.state.user ? '' : this.state.user.photoURL} />
                </figure>
                {this.state.user == null ? '' : this.state.user.displayName}
                <a className='button is-danger' style={{ marginLeft: 8 }}> Sign out</a>
            </div>



        return (
            <div>
                {this.state.user ? SignOut : SignIn}
            </div>
        );
    }
}

export default Authentication;