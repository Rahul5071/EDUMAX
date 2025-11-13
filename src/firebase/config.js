// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzD4QIzHJjS4LGrsX5qVro6ysw9R8XQsM",
  authDomain: "code-nova-38b5f.firebaseapp.com",
  projectId: "code-nova-38b5f",
  storageBucket: "code-nova-38b5f.appspot.com",
  messagingSenderId: "427556559212",
  appId: "1:427556559212:web:ec1855a0c9cffad86b3b49",
  measurementId: "G-0F8G6QWXST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Analytics only in client-side and if supported
let analytics;
const initAnalytics = async () => {
  if (typeof window !== 'undefined') { // Check if running in browser
    const supported = await isSupported();
    if (supported) {
      analytics = getAnalytics(app);
    }
  }
  return analytics;
};

// Export the services
export { 
  app, 
  auth, 
  db, 
  storage, 
  analytics,
  initAnalytics 
};

export default app;