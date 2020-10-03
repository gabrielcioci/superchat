import firebase from "firebase";
const config = {
        apiKey: "AIzaSyDzYGAg4515Up0H8fRpbvoVjOGXTaVaBWY",
        authDomain: "superchat-82c3a.firebaseapp.com",
        databaseURL: "https://superchat-82c3a.firebaseio.com",
        projectId: "superchat-82c3a",
        storageBucket: "superchat-82c3a.appspot.com",
        messagingSenderId: "789662731321",
        appId: "1:789662731321:web:97896b6b88b9ff8fe4d1e8",
        measurementId: "G-KKYW3C51HG"
}

firebase.initializeApp(config)

export default firebase