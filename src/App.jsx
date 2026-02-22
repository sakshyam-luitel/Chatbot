import { useState , useEffect } from "react";
import ChatInput from "./Components/ChatInput";
import ChatMessages from "./Components/ChatMessages";
import './App.css'
import { chatbot } from "supersimpledev";
import dayjs from "dayjs";

const App = ()=>{
        
        const [chatMessages , setChatMessages] =useState(JSON.parse(localStorage.getItem('messages'))||[
            // {message : "hello chatbot" , sender : "user" , id :"id1"},
            // {message : "Hello! How can I help you?" , sender : "chatbot" , id:'id2'},
            // {message : "can you get me todays date?" , sender : "user" , id: "id3"},
            // {message : "Today is September 27" , sender : "chatbot" , id:"id4"},
          ])
          useEffect(()=>{
          chatbot.addResponses(chatMessages)
        },[])
        useEffect(()=>{
          localStorage.setItem('messages' , JSON.stringify(chatMessages)) 
        },[chatMessages])

        const time = dayjs().valueOf()

        return (
          <div className="app-container">
         
            {chatMessages.length == 0 && <p className = "message">Welcome to the chatbot project! Send a message using the textbox below.</p>}
          <ChatMessages
            chatMessages = {chatMessages}
            time = {time}
            />

             <ChatInput 
            chatMessages = {chatMessages}
            setChatMessages = {setChatMessages}
            />
          </div>
        );
         
      }

export default App