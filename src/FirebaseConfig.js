import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyArGhoTs8swPs2MFy-pzXZPZcQIrwuv8F8",
  authDomain: "audio-recording-app-8241b.firebaseapp.com",
  projectId: "audio-recording-app-8241b",
  storageBucket: "audio-recording-app-8241b.appspot.com",
  messagingSenderId: "285243728702",
  appId: "1:285243728702:web:760e1e853067ca71a3c26f",
  storageBucket: "gs://audio-recording-app-8241b.appspot.com",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

class FirebaseConfig {
  static getStorage() {
    return storage;
  }

  static getStorageRef(fileName) {
    return ref(storage, fileName);
  }

  static async upload(storageRef, blob) {
    await uploadBytes(storageRef, blob);
  }
}

export default FirebaseConfig;
