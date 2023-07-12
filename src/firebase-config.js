// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvHq5w6ltisEuWjKzzsrpDsHQ5tsncwGw",
  authDomain: "dummy-chat-402f0.firebaseapp.com",
  projectId: "dummy-chat-402f0",
  storageBucket: "dummy-chat-402f0.appspot.com",
  messagingSenderId: "928337066271",
  appId: "1:928337066271:web:91fdbf86826d4ab038582a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app
export const auth =getAuth(app)
export const storage= getStorage(app)
export const db = getFirestore(app)

