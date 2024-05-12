import axios from 'axios';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import dotenv from 'dotenv';
dotenv.config();

// Config Api's Verbeux
const apiKey = process.env.APIKEY_GENERATIVE;
const id = process.env.GENERATIVE_ID;
const apiUrl = `https://generative-api.verbeux.com.br/session/${id}`;

const requestBody = { "assistant_id": process.env.ASSISTANT_ID };
const headers = { 'Api-Key': apiKey, 'Content-Type': 'application/json' };

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.APIKEY_FIREBASE,
    authDomain: process.env.AUTHDOMAIN_FIREBASE,
    projectId: process.env.PROJECT_ID_FIREBASE,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Mock Stats For Testing Firebase
const feedbackData = {
    name: "Nome test",
    id: "9703419712397278978931278231018927y3yws0d98fuyguvhbssamz",
    feedbackFinal: "1" // 1 - 10 \\ 
};

// Add feedbackData on Firebase
const addFeedback = async () => {
    try {
        const docRef = await addDoc(collection(db, "Feedback"), feedbackData);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

// addFeedback();

// Mock msg
const msg = {
    message: "Test",
    context: {}
};

axios.put(apiUrl, msg, { headers })
    .then(response => {
        console.log('PUT Request response: ', response.data)
    })
    .catch(error => {
        console.log('Error sending message: ', error)
    });

