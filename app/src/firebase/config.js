/* eslint-disable prettier/prettier */
import firebase from 'react-native-firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCjP-OzR6vvCO1sfCKMdhKzTiyVddE0L-0',
  authDomain: 'reactnativelogin-4c8f0.firebaseapp.com',
  projectId: 'reactnativelogin-4c8f0',
  storageBucket: 'reactnativelogin-4c8f0.firebaseapp.com.appspot.com',
  messagingSenderId: '1045084086941',
  appId: '1:1045084086941:android:8749d708da17f08503ea74',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
