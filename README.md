# Autocats ![alt text](https://raw.githubusercontent.com/ripzery/pwahackathon2017/master/public/favicon.ico)
A Web Application that collecting uploaded image from user and auto categorized using Google Cloud Vision API to detect what kinds of image like dog or cat.

Autocats is heavily make use of Firebase, such as Realtime database, Storage, Authentication, Messaging, and Cloud Function.

User can login to subscribe to each category of the image. When someone has upload the image that related to the category, then cloud function will send notification to everybody who subscribe to it.