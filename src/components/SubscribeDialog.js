import React, { Component } from 'react';
import firebase from 'firebase'

const classNames = require('classnames')
const AUTHORIZATION_KEY = "AIzaSyDXDq8_u6oqNAUWCnTcRzY-0sFDZDZQfXQ"
class SubscribeDialog extends Component {
    constructor(props) {
        super();
        this.state = {
            isShow: props.isShow
        }
        // console.log('SubscribeDialog', props.message);
        this.database = firebase.database();
        this.handleSubscribe = this.handleSubscribe.bind(this)
    }

    componentWillReceiveProps(props) {
        this.state = {
            isShow: props.isShow
        }
    }

    handleSubscribe(tag) {
        // Handle error
        if(firebase.auth().currentUser == null) return;
        let database = firebase.database().ref(`subscription/${firebase.auth().currentUser.uid}`)
        database.once('value')
            .then((snapshot) => {
                if (!snapshot || !snapshot.val()){
                    this.database.ref(`subscription/${firebase.auth().currentUser.uid}`).set({
                        tags: [tag]
                    })
                    return;
                }

                let val = snapshot.val()

                // User has already subscribe!
                if(val.tags.indexOf(tag) > -1){
                    //TODO: show notification to user
                    throw new Error('User has already been subscribed to ' + tag + '!');
                }

                if (val.tags != null) return val.tags
            })
            .then((tags) => {
                if(!tags) return
                console.log('Subscribing '+ tag + '...')
                firebase.database().ref(`subscription/${firebase.auth().currentUser.uid}`).set({
                    tags: [...tags, tag]
                })
            })
            .then(() => {
                console.log('User has been subscribe to ' + tag + ' successfully');

                //TODO: subscribe the client app to a topic
                console.log('Subscribe to topic', `https://iid.googleapis.com/iid/v1/${localStorage.getItem('fcm_token')}/rel/topics/${tag}`);
                fetch(`https://iid.googleapis.com/iid/v1/${localStorage.getItem('fcm_token')}/rel/topics/${tag}`, {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': `key=${AUTHORIZATION_KEY}`
                    })
                }).then(resp =>{
                    // TODO: Notify the user
                    if(resp.status === 200)
                        console.log(`Subscribed to ${tag} successfully.`, resp)
                })

                this.props.closeDialogHandler();
            })
            .catch((err) =>{ 
                console.log(err)
                this.props.closeDialogHandler();
            })

    }

    render() {
        let modalClass = classNames({
            'modal': true,
            'is-active': this.state.isShow,
        })
        return (
            <div className={modalClass}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Subscribe to something like.. <b>{this.props.message ? `${this.props.message.tag[0]} or ${this.props.message.tag[1]}?` : ''}</b></p>
                    </header>
                    <section className="modal-card-body">
                        <p className="image is-square">
                            <img src={this.props.message ? this.props.message.imageUrl : "https://fakeimg.pl/300x300/?text=Loading"} />
                        </p>
                    </section>
                    <footer className="modal-card-foot">
                        <a className='button is-success' onClick={() => this.handleSubscribe(this.props.message.tag[0])}>I wanna see {this.props.message ? `${this.props.message.tag[0]}.` : ''}</a>
                        <a className='button' onClick={() => this.handleSubscribe(this.props.message.tag[1])}>{this.props.message ? `No, see ${this.props.message.tag[1]} better!` : ''}</a>
                        <a className='button' onClick={this.props.closeDialogHandler}>Nope</a>
                    </footer>
                </div>
                <button className="modal-close" onClick={this.props.closeDialogHandler}></button>
            </div>
        );
    }
}

export default SubscribeDialog;