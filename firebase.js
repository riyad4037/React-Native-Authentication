// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqBVt-lvYqqa_zRtC6QW0a3__nebdnYGI",
    authDomain: "vaccine-covid-test.firebaseapp.com",
    projectId: "vaccine-covid-test",
    storageBucket: "vaccine-covid-test.appspot.com",
    messagingSenderId: "494805810134",
    appId: "1:494805810134:web:1977aa0c3f5d2e44640277"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// if(!firebase.app.length){
//     firebase.initializeApp(firebaseConfig);
// }

export { firebase };