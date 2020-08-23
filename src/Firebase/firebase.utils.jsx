import firebase from "firebase/app"; //pulling firebase utility library that belongs at firebase/app
import "firebase/firestore"; //imported database library
import "firebase/auth"; //imported authentication library
//we need to import firebase because firestore and auth will be availiable to us then
const firebaseConfig = {
  apiKey: "AIzaSyB0PhHVDdrKsITYN7FaJW1uzOxOBAQiOzI",
  authDomain: "pro-organizer-app-4cab0.firebaseapp.com",
  databaseURL: "https://pro-organizer-app-4cab0.firebaseio.com",
  projectId: "pro-organizer-app-4cab0",
  storageBucket: "pro-organizer-app-4cab0.appspot.com",
  messagingSenderId: "507797288588",
  appId: "1:507797288588:web:f5d6e15b08e81db91ceda9",
  measurementId: "G-DS9014FQPN"
};

firebase.initializeApp(firebaseConfig);
// val firestoreSettings = FirebaseFirestoreSettings.Builder()
//     .setPersistenceEnabled(true)
//     .build()

export const createUserProfileDocument = async (userAuth, additionaldata) => {
  //passed 2 arg i.e 1-the user obj we are getting from firebase and 2-is for signup functionality
  //we will only save data when user is signed in
  if (!userAuth) {
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`); //whether the user exist in our database or not??
  const snapShot = await userRef.get();
  // console.log(snapShot);
  if (!snapShot.exists) {
    //if user doesnot exist create data in database
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionaldata,
      });
    } catch (err) {
      alert("something went wrong" + err.message);
    }
  }
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); //gives acces to google authentication from auth library
//it takes some custom parameter
provider.setCustomParameters({ prompt: "select_account" }); //to popup google signin page for authentication
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
