import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


// Configure Verbeux APIs
const apiKey = process.env.APIKEY_GENERATIVE;
const apiUrl = `https://generative-api.verbeux.com.br/session/`;


let assistantId = parseInt(process.env.ASSISTANT_ID);

const requestBody = { "assistant_id": assistantId };
const headers = { 'Api-Key': apiKey, 'Content-Type': 'application/json' };

axios.post(apiUrl, requestBody, { headers })
    .then(response => {
        console.log('Resposta da criação da sessão:', response.data);
    })
    .catch(error => {
        console.error('Erro ao criar a sessão:', error);
    });