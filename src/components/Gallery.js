import React, { Component } from 'react'
import PropTypes from 'prop-types';
import SubscribeDialog from '../containers/SubscribeDialog'
import './css/gallery.css'
import firebase from 'firebase'

class Gallery extends Component {
    constructor(props) {
        super();
        this.state = {
            messages: [],
            photos: [],
            tag: props.tag,
            subscribeDialog: {
                isShowSubscribeDialog: false,
                message: null
            }
        }
        this._isMounted = true;
        this.loadMessages = this.loadMessages.bind(this)
        this.database = firebase.database().ref('messages')
        this.storage = firebase.storage()
        this.handleClickImage = this.handleClickImage.bind(this)
        this.closeSubscribeDialog = this.closeSubscribeDialog.bind(this)
    }

    loadMessages(data) {
        if (!this._isMounted) return;
        let val = data.val()
        console.log('data', val);
        // if state doesn't contain the message
        if (this.state.messages.filter(message => message.key === data.key).length === 0) {
            if (val.imageUrl.startsWith('gs://')) {
                this.storage.refFromURL(val.imageUrl).getMetadata().then(metadata => {
                    if (!this._isMounted) return;
                    this.setState({
                        messages: [...this.state.messages, this.generateMessage(data.key, val.tag, val.labels, metadata.downloadURLs[0])]
                    }, this.generatePhotos)
                })

                return
            }
            if (!this._isMounted) return;
            this.setState({
                messages: [...this.state.messages, this.generateMessage(data.key, val.tag, val.labels, val.imageUrl)]
            }, this.generatePhotos)
        } else {
            let updateMessage = this.state.messages.filter(message => data.key === message.key)[0]
            let indexUpdateMessage = -1
            for (let i = 0; i < this.state.messages.length; i++) {
                if (this.state.messages[i].key === updateMessage.key) {
                    indexUpdateMessage = i
                    break;
                }
            }
            if (val.imageUrl.startsWith('gs://') && indexUpdateMessage > -1) {
                this.storage.refFromURL(val.imageUrl).getMetadata().then(metadata => {
                    if (!this._isMounted) return;
                    this.setState({
                        messages: [
                            ...this.state.messages.slice(0, indexUpdateMessage),
                            this.generateMessage(data.key, val.tag, val.labels, metadata.downloadURLs[0]),
                            ...this.state.messages.slice(indexUpdateMessage + 1)
                        ]
                    }, this.generatePhotos)
                })
            } else if (val.imageUrl.indexOf('giphy') > -1 && indexUpdateMessage > -1) {
                if (!this._isMounted) return;
                this.setState({
                    messages: [
                        ...this.state.messages.slice(0, indexUpdateMessage),
                        this.generateMessage(data.key, val.tag, val.labels, val.imageUrl),
                        ...this.state.messages.slice(indexUpdateMessage + 1)
                    ]
                }, this.generatePhotos)
            }
        }
    }

    handleClickImage(message) {
        //TODO: Show message that can't click without authentication
        message = this.state.messages.filter(m => m.key == message.key)[0];
        console.log('message', message)
        if(!firebase.auth().currentUser){
            this.props.showNotification('Please login first, then you can subscribe the photo 🙂')
            return
        } 
        if(!message.labels){
            this.props.showNotification('Please wait for a moment. We\'re currently categorized the photo 😉')
            return
        }

        this.setState({
            subscribeDialog: {
                isShowSubscribeDialog: true,
                message: message
            }
        }, () => {
            this.props.toggleSubscribeDialog();
        })
    }

    closeSubscribeDialog(){
        this.setState({
            subscribeDialog: {
                isShowSubscribeDialog: false,
                message: null
            }
        }, this.props.toggleSubscribeDialog)
    }

    componentDidMount() {
        this._isMounted = true;
        // console.log("Start fetch images...")
        // TODO: Watch firebase database for change
        this.database.off()
        this.database.on('child_added', this.loadMessages)
        this.database.on('child_changed', this.loadMessages)
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.database.off()
    }


    componentDidUpdate(prevProps, prevState) {
        // window.scrollTo(0,document.body.scrollHeight);
    }

    render() {
        return (
            <div style={{position: 'relative'}}>
                {
                    this.state.photos.length > 0
                    ? 
                    <div id="gallery">
                    <div className='column is-12'>{this.state.photos}</div>
                    </div>
                    :
                    <div className="block-loading">
                        <h3 className="title loading-title">Loading...</h3>
                    </div>
                }
                
                <SubscribeDialog message={this.state.subscribeDialog.message} closeDialogHandler={this.closeSubscribeDialog} isShow={this.state.subscribeDialog.isShowSubscribeDialog} />
            </div>

        )
    }
}

Gallery.LOADING_IMAGE_URL = "https://www.google.com/images/spin-32.gif"

Gallery.prototype.generateMessage = function (key, tag, labels, imageUrl) {
    return { key, tag, labels, imageUrl }
}

Gallery.prototype.generatePhotos = function () {
    let photos = []
    let column = []
    let messages = this.state.messages;
    let tag = this.state.tag;
    // If user set tag then filter!
    if(tag != null){
        messages = this.state.messages.filter(message => {
                return message.tag[0] && message.tag[1] && (message.tag[0].toLowerCase() === tag.toLowerCase() || message.tag[1].toLowerCase() === tag.toLowerCase())
            });
        this.setState({
            messages: messages
        })
    }

    // Push array of images in the row, everytime number of column is 3
    for (let i = 0; i < messages.length; i++) {
        let message = messages[i];
        if (i % 3 === 0) {
            photos.push(<div className='columns' key={photos.length}>{column}</div>)
            column = []
        }
        column.push(
            <PhotoFigure key={message.key} message={message} clickHandler={this.handleClickImage} />
        )
    }

    // Push all the rest columns
    photos.push(<div className='columns' key={photos.length}>{column}</div>)

    this.setState({ photos: photos })
}

const PhotoFigure = ({ message, clickHandler }) => {
    return (
        <figure className="column image is-one-third photo-cats-container" onClick={() => clickHandler(message)}>
            <img src={message.imageUrl} className="photo" key={'img' + message.key} id={'img' + message.key} />
        </figure>)
}

export default Gallery