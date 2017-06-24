import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Image from './Image';
const classNames = require('classnames');
class UploadDialog extends Component {
    constructor(props) {
        super();
        console.log(props)
        this.handleCloseDialog = this.handleCloseDialog.bind(this)
        this.imagesPreview = []
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.images.length > 0) {
            let totalImages = nextProps.images.length / 3 + 1
            this.imagesPreview = []
            let imagesPreview = this.imagesPreview;
            let previewCount = 0
            let figureNodes = []

            nextProps.images.map((file) => {
                let reader = new FileReader()

                reader.onload = (e) => {
                    if (figureNodes.length < 3 && previewCount != this.props.images.length) { // add to figureNodes
                        figureNodes.push(<figure className="column image" key={`col-${previewCount}`}><img src={e.target.result} /></figure>)
                    }
                    previewCount++;

                    if (figureNodes.length == 3 || previewCount == this.props.images.length){ // add to previewCount and clear figureNodes
                        imagesPreview.push(<div className="columns" key={`cols-${imagesPreview.length}`}>{figureNodes}</div>)
                        figureNodes = [];
                        if(previewCount == this.props.images.length) this.forceUpdate();
                    }
                }
                reader.readAsDataURL(file)
            })
        }
    }


    handleCloseDialog() {
        // console.log("this")
        this.props.closeDialog();
        this.props.clearImages();
    }

    render() {
        let modalClass = classNames({
            'modal': true,
            'is-active': this.props.upload_dialog_opened,
        })


        return (
            <div className='container'>
                <div className={modalClass}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Modal title</p>
                            <button className="delete" onClick={this.handleCloseDialog}></button>
                        </header>
                        <section className="modal-card-body">
                            {this.imagesPreview}
                        </section>
                        <footer className="modal-card-foot">
                            <a className="button is-success">Upload</a>
                            <a className="button" onClick={this.handleCloseDialog}>Cancel</a>
                        </footer>
                    </div>
                    <button className="modal-close" onClick={this.handleCloseDialog}></button>
                </div>
            </div>

        )
    }
}

const previewImages = (e, imagesPreview) => {
    // let newColumns = imagesPreview.length % 3 == 0 ? 


}

export default UploadDialog