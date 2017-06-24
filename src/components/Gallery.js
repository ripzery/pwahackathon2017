import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Image from './Image';
class Gallery extends Component {
    constructor(props) {
        super();
    }

    componentWillReceiveProps (nextProps) {
        console.log(nextProps);
    }
    

    render() {
        console.log(this.props);
        return (
            <div className='container'>
                    
            </div>
        )
    }
}

Gallery.propTypes = {
    images: PropTypes.array.isRequired,
}

export default Gallery