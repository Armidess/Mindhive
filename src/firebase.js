// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCi_7omN11--rSH4tLOp8i5bO55qub-wx4",
	authDomain: "twitter-clone-e6c16.firebaseapp.com",
	projectId: "twitter-clone-e6c16",
	storageBucket: "twitter-clone-e6c16.appspot.com",
	messagingSenderId: "461359277644",
	appId: "1:461359277644:web:9a380aab666bf3436436e9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
