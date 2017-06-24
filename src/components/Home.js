import React, { Component } from 'react';
import Toolbar from './Toolbar';
import Add from '../containers/Add';
import Gallery from '../containers/Gallery';
import UploadDialog from '../containers/UploadDialog';

class Home extends Component {
  constructor(params) {
    super();
  }

  render() {
    return (
      <div>
        <Gallery />
        <Add />
        <UploadDialog />
      </div>
    );
  }
}

export default Home;
