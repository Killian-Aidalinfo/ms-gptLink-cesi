import fetch from 'node-fetch';
// import mongoose from 'mongoose';
// const COLLECTION_NAME = process.env.COLLECTION_NAME || 'defaultCollectionName';

// // Define the schema for the MongoDB collection
// const ResponseSchema = new mongoose.Schema({
//     content: String, // Le contenu de la réponse
//     timestamp: { type: Date, default: Date.now } // La date et l'heure à laquelle la réponse a été enregistrée
// });

// Create a model based on the schema
// const Response = mongoose.model('Response', ResponseSchema, COLLECTION_NAME);

// Define the OpenAI API endpoint and API key
const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Check if the API key is defined
if (!OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not defined');
}

console.log('OPENAI_API_KEY', OPENAI_API_KEY);

// Define the GraphQL resolvers
const resolvers = {
    Query: {
        getCompletion: async (_, { prompt }) => {
            // Create an array of messages to send to the OpenAI API
            const messages = [{
                role: "user",
                content: prompt // Le prompt de l'utilisateur
            }];

            // Send a POST request to the OpenAI API endpoint
            const response = await fetch(OPENAI_API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo', // Le modèle OpenAI à utiliser pour générer la réponse
                    messages: messages, // L'historique de la conversation
                    max_tokens: 3900 // Le nombre maximum de tokens à générer dans la réponse
                })
            });

            // Parse the response as JSON
            const data = await response.json();

            // Log errors
            if (data.error) {
                console.error(data.error);
            }

            // Extract the response content from the OpenAI API response
            const responseContent = data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content.trim() : null;

            // // Save the response content to MongoDB
            // if (responseContent) {
            //     const responseEntry = new Response({ content: responseContent });
            //     await responseEntry.save();
            // }

            // Return the response content
            return responseContent;
        }
    }
};

export default resolvers;