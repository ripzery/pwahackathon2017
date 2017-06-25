import React, { Component } from 'react'
import PropTypes from 'prop-types';
import 'react-mfb/mfb.css'
import { Menu, MainButton, ChildButton } from 'react-mfb';

const classNames= require('classnames');
const styles = {
    hidden : {
        display: 'none'
    }
}
class Add extends Component {   
    handleAdd() {
        document.getElementById('choose-photo').click();
    }

    handleFile(event) {
        let filesList = Object.keys(event.target.files).map(i => event.target.files[i])
        if(filesList[0].size > 4000000){
            this.props.showNotification('We can\'t process the image that over 4 MB. 😭', true)
            return;
        }
        console.log(filesList);
        this.props.addImages(filesList);
        this.props.toggleDialog();
        document.getElementById('upload').reset();
    }

    render() {
        return (
            <div style={{display: this.props.upload_dialog_opened ? 'none' : 'block'}}>
                <Menu effect="slidein" method="click" position="br" >
                    <MainButton iconResting="fa fa-plus" iconActive="fa fa-times" />
                    <ChildButton icon="fa fa-file-image-o" label="Add photo" onClick={this.handleAdd.bind(this)} />
                </Menu>
                <form id="upload" action="#">
                    <input type='file' accept='image/*' name='select-photo' id='choose-photo' onChange={this.handleFile.bind(this)} style={styles.hidden} />
                </form>
            </div>
        )
    }
}

export default Add