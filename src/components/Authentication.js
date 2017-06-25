import React, { Component } from 'react';
import firebase from 'firebase'
import {withRouter} from 'react-router-dom'
import './css/authentication.css'
const googleSignInProvider = new firebase.auth.GoogleAuthProvider();

const AUTHORIZATION_KEY = "AIzaSyDXDq8_u6oqNAUWCnTcRzY-0sFDZDZQfXQ"
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
        firebase.database().ref(`/subscription/${firebase.auth().currentUser.uid}/tags`).once('value')
            .then((snapshot) => {
                if (!snapshot.val()) return

                let tags = snapshot.val();
                return tags
            }).then((tags) => {
                if(!tags) return;
                for (let i = 0; i < tags.length; i++) {
                    fetch(`https://iid.googleapis.com/iid/v1:batchRemove`, {
                        method: 'POST',
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'Authorization': `key=${AUTHORIZATION_KEY}`
                        }),
                        body: JSON.stringify({
                            to: `/topics/${tags[i].tag}`,
                            registration_tokens: [localStorage.getItem('fcm_token')]
                        })
                    }).then(resp => {
                        console.log('Delete push notification', resp)
                    })
                }
            }).then(() => {
                this.props.showNotification('Goodbye!, We will not send any notification to disturb you :)')
                this.auth.signOut()
                this.props.history.push('/');
            }
            )
        // this.auth.signOut();
    }

    onAuthStateChanged(user) {
        this.props.update()
        if (user) { // User is signed in
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
            localStorage.setItem('fcm_token', "");
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

                // Collect all tokens and appending
                let fcmTokens = firebase.database().ref(`fcmTokens/${firebase.auth().currentUser.uid}/tokens`).once('value').then((snapshot) => {
                    let allDeviceTokens = snapshot.val();
                    if (!snapshot.val()) {
                        allDeviceTokens = [];
                    } else if (allDeviceTokens.indexOf(currentToken) > -1) {
                        return
                    }
                    console.log('Received allDeviceTokens', allDeviceTokens)
                    firebase.database().ref(`fcmTokens/${firebase.auth().currentUser.uid}/tokens/`)
                        .set([...allDeviceTokens, currentToken]).then(() => { console.log('Update device token of user', firebase.auth().currentUser.uid) });
                });

                firebase.database().ref(`/subscription/${firebase.auth().currentUser.uid}/tags`).once('value').then((snapshot) => {

                    if (!snapshot.val()) {
                        console.log('User does not subscribe now.');
                        return;
                    }

                    let tags = snapshot.val();
                    console.log(tags)
                    // Call iid to subscribe
                    for (let i = 0; i < tags.length; i++) {
                        let tag = tags[i];
                        console.log('Subscribe to topic', `https://iid.googleapis.com/iid/v1/${localStorage.getItem('fcm_token')}/rel/topics/${tag}`);
                        fetch(`https://iid.googleapis.com/iid/v1/${localStorage.getItem('fcm_token')}/rel/topics/${tag.tag}`, {
                            method: 'POST',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Authorization': `key=${AUTHORIZATION_KEY}`
                            })
                        }).then(resp => {
                            // TODO: Notify the user
                            if (resp.status === 200)
                                console.log(`Subscribed to ${tag.tag} successfully.`, resp)
                        })
                    }
                }).then(() => {
                    this.props.showNotification(`Welcome ${this.state.user.displayName} to Photocats. You can subscribe some categories by clicking on the photo.`)
                })
            } else {
                // Need to request permissions to show notifications.
                console.log('Requesting notifications permission...')
                this.props.showNotification('Allow notification to receive any update about photo you\'ve subscribed from us.')
                firebase.messaging().requestPermission().then(() => {
                    this.saveMessagingDeviceToken();
                })
            }
        }).catch(error => {
            this.props.showNotification('Unexpected feature, but we can\'t get messaging token :(', true)
            console.error('Unable to get messaging token.', error);
        })
    }

    render() {
        const SignIn = <div>
            <a className="button is-info" style={{ marginTop: 8 }} onClick={this.handleSignIn}>Sign-in with Google <i className="fa fa-google" style={{ marginLeft: 8 }} aria-hidden="true"></i></a>
        </div>
        const SignOut =
            <div className='field is-grouped user-profile' onClick={this.handleSignOut}>
                <div className="control">
                    <figure className="image is-32x32">
                        <img src={!this.state.user ? '' : this.state.user.photoURL} />
                    </figure>
                    {this.state.user == null ? '' : this.state.user.displayName}
                </div>
                <div className="control">
                    <a className='button is-danger' style={{ marginLeft: 8 }}> Sign out</a>
                </div>
            </div>

        return (
            <div className="nav-item is-tab">
                {this.props.connected ? (this.state.user ? SignOut : SignIn) : null }
            </div>
        );
    }
}

export default withRouter(Authentication);