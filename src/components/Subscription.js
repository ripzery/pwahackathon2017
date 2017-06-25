import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import SubscriptionDetail from './SubscriptionDetail'
import SubscriptionMenu from './SubscriptionMenu'
import Notification from './Notification'
import firebase from 'firebase';
import './css/subscription.css'

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
        // let tags = this.state.tags;
        // let columns = []
        // let column = [];
        // for (let i = 0; i < tags.length; i++) {
        //     let tag = tags[i];
        //     if (i % 3 === 0) {
        //         columns.push(<div className='columns' key={columns.length}>{column}</div>)
        //         column = []
        //     }
        //     column.push(
        //         <SubscriptionFigure tag={tag} />
        //     )
        // }

        // // Push all the rest columns
        // columns.push(<div className='columns' key={columns.length}>{column}</div>)

        let link = this.state.tags.map((tag, index) => <li key={index}>
            <Link to={`${this.props.match.url}/${tag.tag.toLowerCase()}`}>
                {tag.tag}
            </Link></li>)
        return (
            <div className="container" style={{marginTop:16}}>
                <Route exact path="/subscription" render={() => <SubscriptionMenu link={link} />} />
            </div>
        );
    }
}

const SubscriptionFigure = ({tag}) => {
    return <figure className="column image is-one-third">
        <img src={tag.imageUrl} />
        <div className="text-overlay">
            <h4 className="title is-overlay">{tag.tag}</h4>
        </div>
    </figure>
}

export default Subscription;