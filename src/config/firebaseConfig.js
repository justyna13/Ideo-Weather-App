import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';


var firebaseConfig = {
    // apiKey: "AIzaSyDlO-_12KH9edeX-ncd-iU1PUiZPJg_ATo",
    // authDomain: "weather-app-f8bb2.firebaseapp.com",
    // databaseURL: "https://weather-app-f8bb2.firebaseio.com",
    // projectId: "weather-app-f8bb2",
    // storageBucket: "weather-app-f8bb2.appspot.com",
    // messagingSenderId: "1071435727493",
    // appId: "1:1071435727493:web:84b12f97bfd12577919fec",
    // measurementId: "G-M8DBF7BZN2"

    apiKey: "AIzaSyC1ooN0sWRvMq04TtiHLHNiT9QXZlc2RCk",
    authDomain: "test-bcb90.firebaseapp.com",
    databaseURL: "https://test-bcb90.firebaseio.com",
    projectId: "test-bcb90",
    storageBucket: "test-bcb90.appspot.com",
    messagingSenderId: "500154054763",
    appId: "1:500154054763:web:5063198431e5aae906192e",
    measurementId: "G-S8QJT5RCMQ"

};



firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();


export {
    storage, firebase as default
}
