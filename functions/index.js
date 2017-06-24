const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const vision = require('@google-cloud/vision')();
const exec = require('child-process-promise').exec
const rp = require('request-promise');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
let isCat = false;

exports.sendSubscribeNotification = functions.storage.object().onChange(event => {
    const object = event.data;
    const messageId = object.name.split('/')[1];
    const fileName = object.name.split('/').pop();
    let tags = []

    let messageData = null
    if (object.resourceState === 'not_exists') {
        return console.log('This is a deletion event.');
    } else if (!object.name) {
        return console.log('This is a deploy event.')
    } else if (!object.resourceState == 'exists' && object.metageneration > 1) {
        return console.log('This is a metadata change event', object.metageneration)
    } else if (fileName.split('.').pop == 'webp') {
        return console.log('This image is already webp format');
    }

    console.log("Bucket", object.bucket);
    const bucket = gcs.bucket(object.bucket);
    console.log("Name: ", object.name);
    const file = bucket.file(object.name)
    return admin.database().ref(`messages/${messageId}`).once('value').then(snapshot => {
        messageData = snapshot.val();
        if (!messageData.isReducedQuality) {
            return vision.detectLabels(file)
        }
        throw new Error('The image has been already optimized')
    })
        .then(results => {
            if (!results) return;
            const labels = results[0];
            console.log('Labels:', labels);
            if (labels[0]) tags.push(labels[0])
            if (labels[1]) tags.push(labels[1])
            if (tags == []) tags.push('Any')

            isCat = labels.filter((label, index) => index < 2 && label.toLowerCase().indexOf('cat') > -1).length > 0;
            admin.database().ref(`messages/${object.name.split('/')[1]}`).update({
                labels: labels,
                isCat: isCat,
                tag: tags,
                isReducedQuality: false
            });

            console.log('isCat', isCat)
            return optimizeImageQuality(object.name, bucket)
        })
        .then(() => {
            return rp({
                method: 'POST',
                uri: 'https://fcm.googleapis.com/fcm/send',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `key=AIzaSyDXDq8_u6oqNAUWCnTcRzY-0sFDZDZQfXQ`
                },
                json: {
                    notification: {
                        title: `New ${tags[0]} or ${tags[1]} Photo!`,
                        body: `Someone has been uploaded ${tags[1]} to the app!`,
                        icon: '/favicon.ico',
                        click_action: `https://pwa-hackathon-2017.firebaseapp.com/subscription/${tags[0]}`
                    },
                    to: `/topics/${tags[0]}`
                }
            }).then((resp) => {
                return rp({
                    method: 'POST',
                    uri: 'https://fcm.googleapis.com/fcm/send',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `key=AIzaSyDXDq8_u6oqNAUWCnTcRzY-0sFDZDZQfXQ`
                    },
                    json: {
                        notification: {
                            title: `New ${tags[1]} Photo!`,
                            body: `Someone has been uploaded ${tags[1]} to the app!`,
                            icon: '/favicon.ico',
                            click_action: `https://pwa-hackathon-2017.com/subscription/${tags[1]}`
                        },
                        to: `/topics/${tags[1]}`
                    }
                })
            }).then(resp => console.log(`Send notification to the topic ${tags[0]} and ${tags[1]} successfully.`))
        })
        .catch((err) => {
            console.log(err)
        })
})



function optimizeImageQuality(filePath, bucket) {
    const fileName = filePath.split('/').pop()
    const tempLocalFile = `/tmp/${fileName}`
    const messageId = filePath.split('/')[1]

    return bucket.file(filePath).download({
        destination: tempLocalFile
    })
        .then(() => {
            console.log('Image has been downloaded to', tempLocalFile)
            return exec(`convert -strip -interlace Plane -quality 60% ${tempLocalFile} ${tempLocalFile}`);
        })
        .then(() => {
            console.log('Image has been optimized')
            return bucket.upload(tempLocalFile, {
                destination: filePath
            })
        })
        .then(() => {
            return admin.database().ref(`messages/${messageId}`).update({
                isReducedQuality: true,
            });
        })
        .then(() => {
            console.log('Webp image has been uploaded to', filePath)
        })
}

function catifyImage(filePath, bucket) {
    const fileName = filePath.split('/').pop()
    const tempLocalFile = `/tmp/${fileName}`
    const messageId = filePath.split('/')[1]

    return bucket.file(filePath).download({
        destination: tempLocalFile
    })
        .then(() => {
            console.log('Image has been downloaded to', tempLocalFile)
            return exec(`convert ${tempLocalFile} -channel RGBA -blur 0x3 ${tempLocalFile}`);
        })
        .then(() => {
            console.log('Image has been blurred')
            return bucket.upload(tempLocalFile, {
                destination: filePath
            })
        })
        .then(() => {
            console.log('Blurred image has been uploaded to', filePath)
            return admin.database().ref(`messages/${messageId}`).update({
                isReducedQuality: true,
            });
        })
        .then(() => {
            console.log('Marked the image as blurred in the database');
        })
}