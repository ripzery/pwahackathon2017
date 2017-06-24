import React, { Component } from 'react'
import "bulma/css/bulma.css"
import cat from './cat.svg'
import Authentication from '../containers/Authentication'

class Toolbar extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div>
                <nav className="nav has-shadow">
                    <div className="container">
                        <div className="nav-left">
                            <a className="nav-item">
                                <figure className="image is-32x32">
                                    <img src={cat} alt="Bulma logo" />
                                </figure>
                            </a>
                            <a className="nav-item is-tab is-hidden-mobile is-active">All Photos</a>
                            <a className="nav-item is-tab is-hidden-mobile">Only Subscriptions</a>
                        </div>
                            <span className="nav-toggle">
                            <span></span>
                            <span></span>
                            <span></span>
                            </span>
                        <div className="nav-right nav-menu">
                            <a className="nav-item is-tab is-hidden-tablet is-active">All Photos</a>
                            <a className="nav-item is-tab is-hidden-tablet">Only Subscriptions</a>
                            <Authentication />
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
        )
    }
}

export default Toolbar