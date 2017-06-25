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
import "./components/css/toolbar.css"
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const classNames = require('classnames');

class App extends Component {
  constructor(params) {
    super();
    this.state = {
      isHamburgerOpen: false,
      route: window.location.pathname.indexOf('subscription') > -1 ? '/subscription' : '/'
    }
    this.handleClickAllPhotos = this.handleClickAllPhotos.bind(this)
    this.handleClickOnlySub = this.handleClickOnlySub.bind(this)
    this.update = this.update.bind(this)
    this.handleClickHamburger = this.handleClickHamburger.bind(this)
  }

  handleClickAllPhotos() {
    this.setState({
      route: '/',
      isHamburgerOpen: false
    })
  }

  handleClickOnlySub() {
    this.setState({
      route: '/subscription',
      isHamburgerOpen: false
    })
  }

  handleClickHamburger() {
    console.log('click ham')
    this.setState({
      isHamburgerOpen: !this.state.isHamburgerOpen
    })
  }

  update() {
    this.forceUpdate()
  }

  render() {
    let hamburgerClass = classNames({
      'nav-toggle': true,
      'is-active': this.state.isHamburgerOpen
    })
    let hamburgerMenuClass = classNames({
      'nav-right nav-menu': true,
      'is-active': this.state.isHamburgerOpen
    })
    let linkHomeClass = classNames({
      'nav-item is-tab is-hidden-mobile': true,
      'is-active': this.state.route == '/' || this.state.route == null
    })
    let linkSubscriptionClass = classNames({
      'nav-item is-tab is-hidden-mobile': true,
      'is-active': this.state.route == '/subscription'
    })
    let linkHomeMobileClass = classNames({
      'nav-item is-tab is-hidden-tablet': true,
      'is-active': this.state.route == '/' || this.state.route == null
    })
    let linkSubscriptionMobileClass = classNames({
      'nav-item is-tab is-hidden-tablet': true,
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
                    <h2 className="is-hidden-tablet" style={{ marginLeft: 8 }}><b>PhotoCats</b></h2>
                  </a>
                  <Link className={linkHomeClass} onClick={this.handleClickAllPhotos} to='/'>All Photos</Link>
                  {firebase.auth().currentUser ? <Link className={linkSubscriptionClass} onClick={this.handleClickOnlySub} to='/subscription'>Only Subscriptions</Link> : null}
                </div>
                <span className={hamburgerClass} onClick={this.handleClickHamburger}>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                <div className={hamburgerMenuClass}>
                  <Link className={linkHomeMobileClass} onClick={this.handleClickAllPhotos} to='/'>All Photos</Link>
                  {firebase.auth().currentUser ? <Link className={linkSubscriptionMobileClass} onClick={this.handleClickOnlySub} to='/subscription'>Only Subscriptions</Link> : null}
                  <Authentication update={this.update} />
                </div>
              </div>
            </nav>
          </div>
          <div className="photo-cats-gallery">
            <Notification dialog={false} />
            <Route exact path="/" component={Home} />
            <Route exact path="/subscription" component={Subscription} />
            <Route path="/subscription/:type" component={SubscriptionDetail} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
