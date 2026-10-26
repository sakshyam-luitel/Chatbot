import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import type { ChatMessageData } from "../App";

interface ChatMessagesProps {
  chatMessages: ChatMessageData[];
}

function ChatMessages({ chatMessages }: ChatMessagesProps) {
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);

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

  return <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 no-scrollbar sm:p-6" ref={chatMessagesRef}>{chatMessageComponents}</div>;
}

export default ChatMessages;
