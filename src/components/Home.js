import React, { Component } from 'react';
import Toolbar from './Toolbar';
import Add from '../containers/Add';
import Gallery from '../containers/Gallery';
import UploadDialog from '../containers/UploadDialog';
import firebase from 'firebase'
import "./css/main.css"

class Home extends Component {
  constructor(params) {
    super();
  }

  render() {
    return (
      <div className='container'>
        {this.props.connected ?
          <div>
            <Gallery />
            <Add />
            <UploadDialog /> </div> :
            <div className="block-loading">
              <h3 className="title loading-title is-4">We need internet connection to add or display awesome photos. 😢</h3>
            </div>
        }
      </div>
    );
  }
}

export default Home;
