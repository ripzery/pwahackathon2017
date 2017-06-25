import React, { Component } from 'react'
import PropTypes from 'prop-types';
import "bulma/css/bulma.css"
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import firebase from 'firebase'
const classNames = require('classnames');

class UploadDialog extends Component {
    constructor(props) {
        super();
        this.storage = firebase.storage()
        this.database = firebase.database().ref('messages')
        this.state = {
            image: "",
            opened: false
        };

        this.handleCloseDialog = this.handleCloseDialog.bind(this)
        this.handleCrop = this.handleCrop.bind(this)
        this.imagesPreview = []
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.images.length > 0) {
            window.image = nextProps.images[0]
            let fileReader = new FileReader()
            fileReader.onload = (e) => this.setState({ image: e.target.result, opened: nextProps.dialog_opened })
            fileReader.readAsDataURL(nextProps.images[0]);
        }
    }


    handleCloseDialog() {
        // console.log("this")
        this.props.closeDialog();
        this.props.clearImages();
    }

    handleCrop() {
        let croppedImage = this.refs.cropper.getCroppedCanvas().toDataURL();
        let imageName = this.props.images[0].name;
        //TODO: Upload image using key
        this.database.push({tag: 'Any', imageUrl: UploadDialog.LOADING_IMAGE_URL})
            .then(function(data){
                console.log(data);
                return this.storage.ref(`images/${data.key}/${imageName}`).putString(croppedImage,'data_url')
                           .then(function(snapshot){
                               let fullPath = snapshot.metadata.fullPath
                               console.log(this.storage.ref(fullPath).toString())
                               return data.update({imageUrl: this.storage.ref(fullPath).toString()});
                           }.bind(this));
            }.bind(this))
            .catch(function(error) {
                console.error('There was an error uploading a file to Cloud Storage:', error);
            });
        this.handleCloseDialog();
    }

    render() {
        let modalClass = classNames({
            'modal': true,
            'is-active': this.props.dialog_opened,
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
                                className="is-square"
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

UploadDialog.LOADING_IMAGE_URL = "https://api.ripzery.me/loading2-sm.svg"

export default UploadDialog