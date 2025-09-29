import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyA5ame4IgSrYuXtEJYScEXagaduUKVF3P4",
  authDomain: "chegamais-2ac77.firebaseapp.com",
  projectId: "chegamais-2ac77",
  storageBucket: "chegamais-2ac77.firebasestorage.app",
  messagingSenderId: "620508834733",
  appId: "1:620508834733:web:a42e5a0d836bdc73af8f24",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

export { auth, db };