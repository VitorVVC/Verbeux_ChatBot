import axios from 'axios';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import dotenv from 'dotenv';
dotenv.config();

// Configure Verbeux APIs
const apiKey = process.env.APIKEY_GENERATIVE;
const id = process.env.GENERATIVE_ID_TWO;
const apiUrl = `https://generative-api.verbeux.com.br/session/${id}`;
const headers = { 'Api-Key': apiKey, 'Content-Type': 'application/json' };

// Mock messages \\
// ( If you want to quickly evaluate options 3, 4, 5.
// If you want to test more thoroughly, I recommend running with message one and then two.)
const one = 'Hello, I want to evaluate';
const two = '10, very top';
const three = "I would like to evaluate the company, with a rating of 7 and having an opinion that it is very clean, but ugly.";
const four = "I would like to evaluate the company, with a rating of 3 and having an opinion that it is very promising, but the attendant was extremely rude to me ;(.";
const five = "I would like to evaluate the company, with a rating of 1 and having an opinion that it is very bad!";

const msg = {
    message: one,
    context: {}
};

// Input on Firebase:
let conversationId = ""; // 182317381283


// Put method
axios.put(apiUrl, msg, { headers })
    .then(response => {
        if (response.data && response.data.response && response.data.response.length > 0) {
            const responseData = response.data.response[0].data;
            conversationId = response.data.id;
            console.log('Conversation ID:', conversationId);
            console.log('Object inside data [0]: ', responseData);
            if (responseData.args) {
                console.log('Rating: ', responseData.args.nivelSatisfacao)
                console.log('Opinion: ', responseData.args.opnFinal)
                setResponse(conversationId, responseData.args.nivelSatisfacao, responseData.args.opnFinal);
            }
        } else {
            console.log('Could not find the desired response object in the server response.');
        }
    })
    .catch(error => {
        console.log('Error sending message: ', error)
    });


const setResponse = (conversationId, feedbackFinal, opinionReport) => {
    let isGood;

    if (!conversationId || !feedbackFinal || !opinionReport) {
        console.log('One or more arguments are empty!');
        return;
    }

    let notaFeedback = parseInt(feedbackFinal);
    if (notaFeedback <= 5) {
        isGood = false;
    } else {
        isGood = true;
    }

    addFeedback(conversationId, feedbackFinal, opinionReport, isGood);
};

// Web app's Firebase configuration
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

// Add feedbackData on Firebase
const addFeedback = async (conversationId, feedbackFinal, opinionReport, isGood) => {
    const feedbackData = {
        conversationId: conversationId,
        feedbackFinal: feedbackFinal,
        opinionReport: opinionReport,
        isGood: isGood,
        timestamp: new Date().toISOString()
    };

    try {
        const docRef = await addDoc(collection(db, "Feedback"), feedbackData);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};
