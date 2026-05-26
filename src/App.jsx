import { useState, useEffect } from "react";
import ChatInput from "./Components/ChatInput";
import ChatMessages from "./Components/ChatMessages";
import { chatbot } from "supersimpledev";
import dayjs from "dayjs";

const App = () => {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem("messages")) ||
      [
        // {message : "hello chatbot" , sender : "user" , id :"id1"},
        // {message : "Hello! How can I help you?" , sender : "chatbot" , id:'id2'},
        // {message : "can you get me todays date?" , sender : "user" , id: "id3"},
        // {message : "Today is September 27" , sender : "chatbot" , id:"id4"},
      ],
  );
  useEffect(() => {
    chatbot.addResponses(chatMessages);
  }, []);
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  const time = dayjs().valueOf();

  return (
    <div className="max-w-2xl mx-auto flex flex-col bg-white shadow-lg overflow-hidden sm:border-x sm:border-gray-200 h-dvh">
      {chatMessages.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <p className="text-gray-500 text-lg">
            Welcome to the chatbot. Send a message using the textbox
            below.
          </p>
        </div>
      )}

      <ChatMessages chatMessages={chatMessages} time={time} />

      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
};

export default App;
