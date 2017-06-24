import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import SubscriptionDetail from './SubscriptionDetail'
import SubscriptionMenu from './SubscriptionMenu'
import firebase from 'firebase';

class Subscription extends Component {

    constructor(props) {
        super();
        console.log(props.match.url)
        this.state = {
            tags: []
        }
        this.handleAuthChange = this.handleAuthChange.bind(this)
        this.readSubscription = this.readSubscription.bind(this)
        firebase.auth().onAuthStateChanged(this.handleAuthChange)
    }

    handleAuthChange(user) {
        if (user) {
            this.readSubscription()
        }
    }

    readSubscription() {
        let database = firebase.database().ref(`/subscription/${firebase.auth().currentUser.uid}`)
        database.once('value').then((snapshot) => {
            if (!snapshot || !snapshot.val()) throw new Error('User has not subscribe to anything yet!');
            let val = snapshot.val()
            this.setState({
                tags: val.tags
            });
        }).catch((err) => console.log(err))
    }



    componentDidMount() {
        //TODO: handle user doesn't logged in
        if (!firebase.auth().currentUser) {
            console.log('Current user is null')
            return;
        }
        this.readSubscription()
        // this.props.active()
    }


    render() {
        let link = this.state.tags.map((tag, index) => <li key={index}><Link to={`${this.props.match.url}/${tag.toLowerCase()}`}>{tag}</Link></li>)
        return (
            <div style={{ marginTop: 16, marginLeft: 32, marginRight: 32 }}>
                <Route exact path="/subscription" render={() => <SubscriptionMenu link={link} />} />
            </div>
        );
    }
}

export default Subscription;