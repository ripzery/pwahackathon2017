import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Toolbar extends Component {
    render() {
        return (
            <div>
                <nav className="nav has-shadow">
                    <div className="container">
                        <span id='nav-toggle' className="nav-toggle">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                        <div className='nav-left'>
                            <a className="nav-item is-tab is-hidden-mobile is-active">Home</a>
                            <a className="nav-item is-tab is-hidden-mobile">Subscriptions</a>
                            <div className='nav-item is-hidden-tablet'>
                                <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo" />
                            </div>
                        </div>
                        <div className='nav-center'>
                            <div className='nav-item is-hidden-mobile'>
                                <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo" />
                            </div>
                        </div>
                        <div id='nav-menu' className="nav-right nav-menu">
                            <a className="nav-item is-tab is-hidden-tablet is-active">Home</a>
                            <a className="nav-item is-tab is-hidden-tablet">Subscriptions</a>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

Toolbar.propTypes = {

}

export default Toolbar