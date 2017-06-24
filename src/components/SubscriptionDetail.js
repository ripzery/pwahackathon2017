import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import Gallery from './Gallery'
class SubscriptionDetail extends Component {

    render() {
        let tag = this.props.match.params.type.charAt(0).toUpperCase() + this.props.match.params.type.slice(1);
        return (
            <div>
                <section className="hero is-info">
                    <div className="hero-body">
                        <div className="container">
                            <div className='columns is-vcentered'>
                                <div className='column is-11'>
                                    <h1 className="title">
                                        {tag}
                                    </h1>
                                    <h2 className="subtitle">
                                        All photos about {tag} here.
                                    </h2>
                                </div>
                                <div className='column'>
                                    <Link to='/subscription'>Back</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div>
                    {/*All about this tag here*/}

                    <Gallery tag={tag}/>
                </div>
            </div>
        );
    }
}

export default SubscriptionDetail;