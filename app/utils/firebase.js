import firebase from "firebase/app";

  const firebaseConfig = {
    apiKey: "AIzaSyAXBTmfTOB-jCBtuMF6w0FVlTvhthClVlw",
    authDomain: "tenedores-81bf7.firebaseapp.com",
    databaseURL: "https://tenedores-81bf7.firebaseio.com",
    projectId: "tenedores-81bf7",
    storageBucket: "tenedores-81bf7.appspot.com",
    messagingSenderId: "531918513703",
    appId: "1:531918513703:web:9c2e1819f14f6be5c59002"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig);  
