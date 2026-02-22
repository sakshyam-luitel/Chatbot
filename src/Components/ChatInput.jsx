import React from "react";
import { Chatbot} from 'supersimpledev';
import LoadingSpinner from "../assets/loading-spinner.gif";
import './ChatInput.css' 
import dayjs from "dayjs";

 function ChatInput({chatMessages,setChatMessages}){
        const [inputText , setInputText] = React.useState('');
        const [isLoading , setIsLoading] = React.useState(false);

        function saveInputText(event){
            setInputText(event.target.value);
        }

        function saveInputTextByKey(event){
          if (event.key ==="Enter")
            {
              sendMessage();
            }
          else if(event.key ==="Escape")
          {
            setInputText('');
          }
        }

        async function sendMessage(){
          setIsLoading(true);
          if(isLoading || inputText === ''){
            return;
          }

          const newChatMessages = [
              ...chatMessages,
              {
                message:inputText ,
                sender:'user',
                id :crypto.randomUUID(),
                time:dayjs().valueOf()
              }
            ]
          setChatMessages(newChatMessages);

            setChatMessages([
              ...newChatMessages,
              {
                message:<img src = {LoadingSpinner} alt = "loading-spinner" className="loading-spinner"/> ,
                sender:'chatbot',
                id :crypto.randomUUID(),
                time: dayjs().valueOf()
              }
            ]);
            setInputText('')

            const response = await Chatbot.getResponseAsync(inputText);
            setChatMessages([
              ...newChatMessages,
              {
                message:response ,
                sender:'chatbot',
                id :crypto.randomUUID(),
                time:dayjs().valueOf()
              }
            ]);
            setIsLoading(false)


          // setInputText('')
        }

        function clearMessage(){
          setChatMessages([])
          localStorage.clear('messages')
          
        }

        return(
          <>
          <div className = "chat-input-container">
            <input 
              placeholder ="Send a message to Chatbot"
              size = "30"
              onChange ={saveInputText}
              onKeyDown = {saveInputTextByKey}
              value={inputText}
              className = "chat-input"
            />
            <button onClick = {sendMessage} className ="send-button">Send</button>
            <button onClick = {clearMessage} className ="clear-button">Clear</button>
          </div>
          </>
        );
      }

      export default ChatInput