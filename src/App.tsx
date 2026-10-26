import { useState, useEffect } from "react";
import ChatInput from "./Components/ChatInput";
import ChatMessages from "./Components/ChatMessages";

export interface ChatMessageData {
  message: string;
  sender: "user" | "chatbot";
  id: string;
  time: number;
  isLoading?: boolean;
}

function getSavedMessages(): ChatMessageData[] {
  try {
    const savedMessages = localStorage.getItem("messages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  } catch {
    return [];
  }
}

const App = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessageData[]>(getSavedMessages);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className="h-dvh w-full overflow-hidden bg-white">
      <div className="flex h-full w-full flex-col overflow-hidden bg-white">
        <header className="shrink-0 border-b border-amber-100 bg-amber-400 px-4 py-3 sm:px-6 sm:py-4">
          <h1 className="text-lg font-semibold text-gray-900">Chatbot</h1>
          <p className="text-sm text-amber-950">A simple AI assistant for helpful conversations.</p>
        </header>

        {chatMessages.length === 0 && (
          <div className="flex flex-1 items-center justify-center p-6 text-center">
            <p className="text-gray-500">Send a message to start a conversation.</p>
          </div>
        )}

        <ChatMessages chatMessages={chatMessages} />

        <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages} />

        <footer className="border-t border-gray-100 px-5 py-2 text-center text-xs text-gray-400">
          Chatbot project
        </footer>
      </div>
    </div>
  );
};

export default App;
