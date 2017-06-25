import React, { Component } from 'react';
import "./css/notification.css";
const classNames = require('classnames')
// Receive props [message, isShow]
class Notification extends Component {
    constructor(props) {
        super();
        this.handleDelete = this.handleDelete.bind(this)
        this.hideNotification = this.hideNotification.bind(this)
        this.isDialog = props.dialog;
        this.notification = null
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps){
            if(nextProps.isShow){
                if(this.notification) clearTimeout(this.notification)
                this.notification = setTimeout(() => {
                    this.hideNotification()
                }, 5000)
            }
        }
    }

    hideNotification(){
        this.props.hideNotification();
    }
    
    handleDelete(){
        this.props.hideNotification();
    }

    render() {
        console.log('isShowNotification', this.props.isShow);
        let notificationClass = classNames({
            'notification': true,
            'is-primary': !this.props.isError,
            'is-danger': this.props.isError,
            'is-hidden': !this.props.isShow || this.isDialog != this.props.isDialog
        })
        return (
            <div className={notificationClass}>
                <button className="delete" onClick={this.handleDelete}></button>
                {this.props.message}
            </div>
        );
    }
}

export default Notification;