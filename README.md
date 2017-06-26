# Autocats
A Web Application that collecting uploaded image from user and auto categorized using Google Cloud Vision API to detect what kinds of image like dog or cat. User can login to subscribe to each category of the image. When someone has upload the image that related to the category, then cloud function will send notification to everybody who subscribe to it.

Autocats is heavily make use of Firebase, such as Realtime database, Storage, Authentication, Messaging, and Cloud Function.

Cloud function is mainly used for *Reduce image size* and *Classify an image with Cloud Vision API*, it is triggered when image is uploaded.

Autocats supports offline mode (Service Worker with Cache-First Strategy), so the client can see partial of the page when offline. When the client become online, the content will be loaded automatically.


# Website
https://pwa-hackathon-2017.firebaseapp.com/


# Benchmark
![Lighthouse score](https://github.com/ripzery/pwahackathon2017/blob/master/lighthouse-score.png)
