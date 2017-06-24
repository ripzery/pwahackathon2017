
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
        console.log(filesList);
        this.props.addImages(filesList);
        this.props.toggleDialog();
    }

    render() {
        console.log(this.props.upload_dialog_opened)
        return (
            <div style={{display: this.props.upload_dialog_opened ? 'none' : 'block'}}>
                <Menu effect="slidein" method="click" position="br" >
                    <MainButton iconResting="ion-plus-round" iconActive="ion-close-round" />
                    <ChildButton icon="ion-images" label="Add photo" onClick={this.handleAdd.bind(this)} />
                </Menu>
                <input type='file' accept='image/*' multiple name='select-photo' id='choose-photo' onChange={this.handleFile.bind(this)} style={styles.hidden} />
            </div>
        )
    }
}

Add.propTypes = {

}

export default Add