# Verbeux ChatBot

## Pré-Requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- Um editor de código, como [VSCode](https://code.visualstudio.com/)

Além dessas ferramentas, para desfrutar de 100% do projeto, será necessário:
- Uma conta na [Verbeux](https://verbeux.com.br)
- Uma conta no [Firebase](https://firebase.google.com/?hl=pt-br)

## Configuração do Firebase

1. Crie um novo projeto no [Firebase Console](https://console.firebase.google.com/)
2. Obtenha as credenciais de autenticação do Firebase 
3. Crie um Firestore Database
4. Crie uma coleção chamada `Feedback`
5. Após isso, o firebase está pronto. Apenas lembre-se de substituir os campos de seu banco pelo meu, como está de exemplo nas variáveis de ambiente.
6. OBS: `Caso possua dúvidas ou dificuldades, assista o video atrelado na documentação abaixo`
- [Mais informações sobre o Firebase neste projeto](docs/firebase.md)

## Configuração da Verbeux

1. Crie um novo *bot generativo*, passe para o seu bot esta **INSTRUÇÃO**: *Você é um assistente virtual que responde nossos usuários da Verbeux Alimentos, sobre um feedback geral de nossa empresa.* Ele não deverá ser restrito ao contexto e seu limite de resposta deverá ser automático.
2. Em *Arquivos*, passe para ele o arquivo fornecido na pasta docs: [Bot_Rules](docs/Bot_Rules.pdf)
3. Em seus *Gatilhos*, crie apenas um. Com as configurações a dispor na imagem na documentação da [Verbeux](docs/verbeux.md#funções)
4. Após isso, seu bot está pronto. Gere uma api_key na aplicação e substitua ela no código.
5. OBS: `Caso possua dúvidas ou dificuldades, assista o video atrelado na documentação abaixo`
- [Mais informações sobre a Verbeux neste projeto](docs/verbeux.md)

## Variáveis de Ambiente

- Onde houver no código, linhas como: 
```javascript
const firebaseConfig = {
    apiKey: process.env.APIKEY_FIREBASE,
    authDomain: process.env.AUTHDOMAIN_FIREBASE,
    projectId: process.env.PROJECT_ID_FIREBASE,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};
```
Apenas troque-as para seus próprios dados, como segue de exemplo em .env.example. (**Se aplica também nas configurações da VERBEUX**)

## Instalação e Execução

```bash
# Clone este repositório
git clone git@github.com:VitorVVC/Verbeux_ChatBot.git

# Acesse a pasta via terminal / cmd
cd Verbeux_ChatBot 

# Instale as dependências
npm install
```

## Ajuda
Caso precise de ajuda, possuo videos atrelados a este repositorio sobre o firebase e também a plataforma da verbeux. Caso mesmo assim você esteja com dificuldade de rodar o projeto, faço o convite de me chamar em meu Linkedin, estou sempre de olho por lá e devo lhe responder rapidamente.
- [Videos](https://drive.google.com/drive/folders/13IEMd8G-0p4FOjLBHbCBAA9pqlEhdDcb?usp=sharing)
- [Linkedin](https://www.linkedin.com/in/vitor-cardoso-3a550326a/).

Caso encontre algum erro, bug ou comportamento incorreto, sinta-se a vontade para dar um fork e corrigi-los. Forte abraço!