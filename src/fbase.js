import  firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD6At0-GVUKrg_1IgTB3NrQcJeP_vzkg6s",
    authDomain: "twitter-4daf9.firebaseapp.com",
    projectId: "twitter-4daf9",
    storageBucket: "twitter-4daf9.appspot.com",
    messagingSenderId: "616321566233",
    appId: "1:616321566233:web:84b4f71aa39765904e8c88"
  };

firebase.initializeApp(firebaseConfig);

// firebase에 관련 모든 것을 export하는 대신에 필요로하는 서비스만 export할 수 있음!
// auth()는 유저의 로그인여부를 확인함.
export const authService = firebase.auth();

export const firebaseInstance = firebase;

export const dbService = firebase.firestore();

export const storageService = firebase.storage();