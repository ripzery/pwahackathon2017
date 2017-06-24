import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Image from './Image';
import "bulma/css/bulma.css"
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
const classNames = require('classnames');
// const cropOptions = {
    // aspect: 1/1
// }

class UploadDialog extends Component {
    constructor(props) {
        super();
        console.log(props)
        this.state = {
            image: "",
            opened: false
        };

        this.handleCloseDialog = this.handleCloseDialog.bind(this)
        this.handleCrop = this.handleCrop.bind(this)
        this.imagesPreview = []
        this.firebase = new Firebase()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.images.length > 0) {
            let fileReader = new FileReader()
            fileReader.onload = (e) => this.setState({image: e.target.result, opened: nextProps.upload_dialog_opened})
            fileReader.readAsDataURL(nextProps.images[0]);
        }
    }


    handleCloseDialog() {
        // console.log("this")
        this.props.closeDialog();
        this.props.clearImages();
    }

    handleCrop(){
        let croppedImage = this.refs.cropper.getCroppedCanvas().toDataURL();

        // TODO: Upload image to firebase here
        // Create a root reference
        var storageRef = firebase.storage().ref('images');

        // Create a reference to 'mountains.jpg'
        var mountainsRef = storageRef.child(`${this.props.images[0].name}.jpg`);

        // Create a reference to 'images/mountains.jpg'
        var mountainImagesRef = storageRef.child('images/mountains.jpg');

        // While the file names are the same, the references point to different files
        mountainsRef.name === mountainImagesRef.name            // true
        mountainsRef.fullPath === mountainImagesRef.fullPath    // false
        
        this.handleCloseDialog();
    }

    render() {
         let modalClass = classNames({
            'modal': true,
            'is-active': this.props.upload_dialog_opened,
         })
        return (
                <div className={modalClass}>
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className="card">
                            <header className="card-header">
                                <p className="card-header-title">
                                    Crop Image
                                </p>
                            </header>
                            <div className="card-content">
                                <Cropper
                                    ref='cropper'
                                    src={this.state.image}
                                    style={{height: 400, width: '100%'}}
                                    // Cropper.js options
                                    aspectRatio={1}
                                    guides={true}
                                    />
                            </div>
                            <footer className="card-footer">
                                <a className="card-footer-item" onClick={this.handleCrop}>Save</a>
                            </footer>
                        </div>
                        
                    </div>

                    <button className="modal-close" onClick={this.handleCloseDialog}></button>
                </div>
        )
    }
}

export default UploadDialog