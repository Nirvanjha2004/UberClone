// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs9KzDYRXbBM0pIhbhLAeA4Y6PlLmHrjM",
  authDomain: "uberclone-f6f36.firebaseapp.com",
  projectId: "uberclone-f6f36",
  storageBucket: "uberclone-f6f36.appspot.com",
  messagingSenderId: "774999210717",
  appId: "1:774999210717:web:668be9f3301da5d1a17934"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=  getAuth(app);
