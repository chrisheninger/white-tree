import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCz7TpivmTi-u9Sg0dglsPG8Syp7gHQKSk',
  authDomain: 'white-tree.firebaseapp.com',
  databaseURL: 'https://white-tree.firebaseio.com',
  projectId: 'white-tree',
  storageBucket: 'white-tree.appspot.com',
  messagingSenderId: '633229938297',
};

firebase.initializeApp(config);

export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
