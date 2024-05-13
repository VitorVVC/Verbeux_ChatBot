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

// Mock msg
const um = 'Quero avaliar'
const dois = '10';
const msg = {
    message: um,
    context: {}
};


axios.put(apiUrl, msg, { headers })
    .then(response => {
        // Verifica se a resposta contém um objeto 'response' e se 'response.data' é uma matriz com pelo menos um elemento
        if (response.data && Array.isArray(response.data.response) && response.data.response.length > 0) {
            const responseData = response.data.response[0].data; // Acessa o objeto dentro de 'response.data'
            const notaAvaliacao = responseData.args;
            const conversationId = response.data.id;
            console.log('ID da conversa:', conversationId);
            console.log('Objeto dentro do campo data:[0]', responseData);
            console.log('Nota avaliação: ', notaAvaliacao)

        } else {
            console.log('Não foi possível encontrar o objeto de resposta desejado na resposta do servidor.');
        }
    })
    .catch(error => {
        console.log('Erro ao enviar mensagem: ', error)
    });


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
