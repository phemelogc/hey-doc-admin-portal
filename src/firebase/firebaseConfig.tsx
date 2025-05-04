// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // ✅ Import Firebase Auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsOymN9qQkrcyqQIdT8Tb9jqEOpc9DAD4",
  authDomain: "doctorapp-1c439.firebaseapp.com",
  projectId: "doctorapp-1c439",
  storageBucket: "doctorapp-1c439.appspot.com", // ✅ Corrected
  messagingSenderId: "909285294383",
  appId: "1:909285294383:web:f2e026ab9bb568833aa1da",
  measurementId: "G-3K82EGN4XM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app); // ✅ Export Auth
