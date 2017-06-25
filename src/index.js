import React from 'react';
import ReactDOM from 'react-dom';
import App from './AppContainer';
import Home from './components/Home'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import firebase from 'firebase'

const root = document.getElementById('root');
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

firebase.initializeApp({
    apiKey: "AIzaSyCBwMSblZyGI0RgJSnz38K9HlpGUWoWdD4",
    authDomain: "pwa-hackathon-2017.firebaseapp.com",
    databaseURL: "https://pwa-hackathon-2017.firebaseio.com",
    projectId: "pwa-hackathon-2017",
    storageBucket: "pwa-hackathon-2017.appspot.com",
    messagingSenderId: "181283791359"
});

// const Main = (
//     <Provider store={store}>
//         <Router history={hashHistory}>
//             <Route path="/" component={App}>
//                 <Route path="/" component={Home} />
//                 <Route path="/subscriptions" component={Home} />
//             </Route>
//         </Router>
//     </Provider>
// )

firebase.messaging().onMessage(payload => {
    console.log("Message receive.", payload);
})

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    , root);

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default
        ReactDOM.render(
            <Provider store={store}>
                <Router>
                    <NextApp />
                </Router>
            </Provider>, root)
    })
}

registerServiceWorker();
