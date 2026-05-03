// import 'dotenv/config'
// // import OpenAI from "openai";
// // const client = new OpenAI()

// // const response = await client.responses.create({
// //     model : "gpt-5.5",
// //     input : "write a short content on middleeast"
// // })

// // console.log(response.output_text)



// import { GoogleGenAI } from "@google/genai";

// // The client gets the API key from the environment variable `GEMINI_API_KEY`.
// const ai = new GoogleGenAI({});

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-3-flash-preview",
//     contents: "Explain how AI works in a few words",
//   });
//   console.log(response.text);
// }

// main();

import 'dotenv/config';
import Groq from 'groq-sdk';

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const result = await client.chat.completions.create({
  model: 'llama-3.3-70b-versatile', // free model
  messages: [{ role: 'user', content: 'write a paragraph on Nepal as a mountainous country' }],
});

console.log(result.choices[0].message.content);
