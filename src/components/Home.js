import React, { Component } from 'react';
import Toolbar from './Toolbar';
import Add from '../containers/Add';
import Gallery from '../containers/Gallery';
import UploadDialog from '../containers/UploadDialog';
import firebase from 'firebase'

class Home extends Component {
  constructor(params) {
    super();
  }

  render() {
    return (
      <div className='container' style={{ height: '100vh' }}>
        {this.props.connected ?
          <div>
            <Gallery />
            <Add />
            <UploadDialog /> </div> :
          <h3 className="title loading-title is-4">We need internet connection to add or display awesome photos. 😢</h3>
        }
      </div>
    );
  }
}

export default Home;
