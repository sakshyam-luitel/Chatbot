import { useRef } from "react";
import { useEffect } from "react";
import ChatMessage from "./ChatMessage";

interface ChatMessagesProps {
  chatMessages : String
}

function ChatMessages({ chatMessages }: ChatMessagesProps) {
  // const array = React.useState([
  //     {message : "hello chatbot" , sender : "user" , id :"id1"},
  //     {message : "Hello! How can I help you?" , sender : "chatbot" , id:'id2'},
  //     {message : "can you get me todays date?" , sender : "user" , id: "id3"},
  //     {message : "Today is September 27" , sender : "chatbot" , id:"id4"},
  //   ])

  //   const chatMessages = array[0];
  //   const setChatMessages = array[1];

  // function sendMessage(){
  // chatMessages.push({
  //   message:'test message',
  //   sender:'user',
  //   id :crypto.randomUUID()
  // })

  //copies chatMessage with spread ... operator and added new message
  // which is inside of the curly braces as an object
  // setChatMessages([
  //   ...chatMessages,
  //   {
  //     message:'test',
  //     sender:'user',
  //     id :crypto.randomUUID()
  //   }
  // ])
  //}
  function useAutoScroll(dependencies) {
    const chatMessagesRef = useRef(null);
    useEffect(() => {
      const containerElem = chatMessagesRef.current;
      if (containerElem) {
        containerElem.scrollTop = containerElem.scrollHeight;
      }
    }, [dependencies]);
    return chatMessagesRef;
  }

  const chatMessageComponents = chatMessages.map((chatMessage) => {
    return (
      <ChatMessage
        message={chatMessage.message}
        sender={chatMessage.sender}
        time={chatMessage.time}
        key={chatMessage.id}
      />
    );
  });

  return (
    <div
      className="flex-1 mt-5 overflow-y-auto p-4 space-y-4 no-scrollbar"
      ref={useAutoScroll([chatMessages])}
    >
      {/*{/*{ChatInput()}
          <ChatInput></ChatInput>*/}
      {/*<ChatInput/>
          <ChatMessage 
            message ="hello chatbot"
            sender = "user"
          />
          <ChatMessage
            message = "Hello! How can I  help you?"
            sender = "chatbot"
          />
          <ChatMessage
            message = "can you get me todays date?"
            sender = "user"
          />
          <ChatMessage
            message = "Today is September 27"
            sender ="chatbot"
          />
          */}
      {/*All the three lines above does the same thing calling the component*/}

      {chatMessageComponents}
    </div>
  );
}

export default ChatMessages;
