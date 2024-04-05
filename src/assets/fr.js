
import firebase from 'firebase';


 var firebaseConfig = {
    apiKey: "AIzaSyCn6hJ4r0z0gmKYbUFjS4ugPqRwWRTODKo",
    authDomain: "web-project-1e0ca.firebaseapp.com",
    projectId: "web-project-1e0ca",
    storageBucket: "web-project-1e0ca.appspot.com",
    messagingSenderId: "498143452153",
    appId: "1:498143452153:web:ed74df2f4f14223408fb28"
  };


  const fireapp = firebase.initializeApp(firebaseConfig);

  const auth = fireapp.auth();
  const firest = fireapp.firestore();
  const storage = fireapp.storage();

  export default {auth,firest,storage}