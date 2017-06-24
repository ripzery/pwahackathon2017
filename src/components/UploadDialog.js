import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Image from './Image';
const classNames= require('classnames');
class UploadDialog extends Component {
    constructor(props) {
        super();
        console.log(props)
        this.handleCloseDialog = this.handleCloseDialog.bind(this)
    }

    handleCloseDialog(){
        // console.log("this")
        this.props.closeDialog();
        this.props.clearImages();
    }

    render() {
        let modalClass = classNames({
            'modal': true,
            'is-active': this.props.upload_dialog_opened,
        })

        console.log("dialog open : ", this.props.upload_dialog_opened);
        return (
            <div className='container'>
                <div className={modalClass}>
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className='container'>
                            haha i can't believe it.
                        </div>
                    </div>
                    <button className="modal-close" onClick={this.handleCloseDialog}></button>
                </div>
            </div>
        )
    }
}
export default UploadDialog