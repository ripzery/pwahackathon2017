import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar';
import Add from './containers/Add';
import Gallery from './containers/Gallery';
import UploadDialog from './containers/UploadDialog';

class App extends Component {
  constructor(params) {
    super();
    this.images = ['image1', 'image2', 'image3']
  }

  render() {
    return (
      <div>
        <Toolbar />
        <Gallery images={this.images} />
        <Add />
        <UploadDialog />
      </div>
    );
  }
}

export default App;