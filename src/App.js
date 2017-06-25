import React, { Component } from 'react';
import './App.css';
import Home from './components/Home'
import Subscription from './components/Subscription'
import SubscriptionDetail from './components/SubscriptionDetail'
import "bulma/css/bulma.css"
import cat from './components/cat.svg'
import firebase from 'firebase'
import Notification from './containers/Notification'
import Authentication from './containers/Authentication'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const classNames = require('classnames');

class App extends Component {
  constructor(params) {
    super();
    this.handleClickAllPhotos = this.handleClickAllPhotos.bind(this)
    this.handleClickOnlySub = this.handleClickOnlySub.bind(this)
    this.update = this.update.bind(this)
    this.state = {
      route: window.location.pathname.indexOf('subscription') > -1 ? '/subscription' : '/'
    }
  }

  handleClickAllPhotos(){
    this.setState({
      route: '/'
    })
  }

  handleClickOnlySub(){
    this.setState({
      route: '/subscription'
    })
  }

  update(){
      this.forceUpdate()
  }

  render() {
    let linkHomeClass = classNames({
      'nav-item is-tab is-hidden-mobile': true,
      'is-active': this.state.route == '/' || this.state.route == null
    })
    let linkSubscriptionClass = classNames({
      'nav-item is-tab is-hidden-mobile': true,
      'is-active': this.state.route == '/subscription'
    })
    // console.log('firebase', firebase.auth().currentUser)
    return (
      <Router>
        <div>
          <div>
            <nav className="nav has-shadow">
              <div className="container">
                <div className="nav-left">
                  <a className="nav-item">
                    <figure className="image is-32x32">
                      <img src={cat} alt="Bulma logo" />
                    </figure>
                  </a>
                  <Link className={linkHomeClass} onClick={this.handleClickAllPhotos} to='/'>All Photos</Link>
                  { firebase.auth().currentUser ? <Link className={linkSubscriptionClass} onClick={this.handleClickOnlySub} to='/subscription'>Only Subscriptions</Link> : null}
                </div>
                <span className="nav-toggle">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                <div className="nav-right nav-menu">
                  <a className="nav-item is-tab is-hidden-tablet is-active">All Photos</a>
                  <a className="nav-item is-tab is-hidden-tablet">Only Subscriptions</a>
                  <Authentication update={this.update} />
                </div>
              </div>
            </nav>
            {/*<section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                <img src={cat} width={48} height={48} /> Autocats
                            </h1>
                            <h2 className="subtitle">
                                Upload any photos, but we display clearly only a cat!
                            </h2>
                        </div>
                    </div>
                </section>*/}
                  
          </div>
          {/*Add child component here*/}
          <Notification />
          <Route exact path="/" component={Home} />
          <Route exact path="/subscription" component={Subscription} />
          <Route path="/subscription/:type" component={SubscriptionDetail} />
        </div>
      </Router>
    );
  }
}

export default App;
