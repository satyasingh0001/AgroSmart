import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCpxdj3ayV9qMycIRiebLdDNMZMvV4uTKc",
  authDomain: "project-esp32-cbe7f.firebaseapp.com",
  databaseURL: "https://project-esp32-cbe7f-default-rtdb.firebaseio.com",
  projectId: "project-esp32-cbe7f",
  storageBucket: "project-esp32-cbe7f.firebasestorage.app",
  messagingSenderId: "35685737183",
  appId: "1:35685737183:web:dd72f80ae3b30f917d7f6a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logoutUser() {
  return signOut(auth);
}

export function authState(callback) {
  onAuthStateChanged(auth, callback);
}

export async function fetchESP32Data() {
  const dbRef = ref(db, "ESP32");
  const snapshot = await get(dbRef);
  return snapshot.exists() ? snapshot.val() : {};
}

export async function setMotorStatus(status) {
  const dbRef = ref(db, "ESP32/Motor");
  await set(dbRef, status);
}
