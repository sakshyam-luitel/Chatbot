import React from "react";
import LoadingSpinner from "../assets/loading-spinner.gif";
import dayjs from "dayjs";
import Groq from "groq-sdk";

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function saveInputTextByKey(event) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  async function sendMessage() {
    if (isLoading || inputText === "") return;
    setIsLoading(true);

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ];
    setChatMessages(newChatMessages);

    // ✅ Store a flag instead of JSX
    setChatMessages([
      ...newChatMessages,
      {
        message: "loading",
        sender: "chatbot",
        isLoading: true,
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ]);
    setInputText("");

    const client = new Groq({
      apiKey: import.meta.env.VITE_GROQ_API_KEY, // ✅ correct prefix
      dangerouslyAllowBrowser: true,
    });

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: inputText }],
    });

    // ✅ Extract text from response
    const replyText = response.choices[0].message.content;

    setChatMessages([
      ...newChatMessages,
      {
        message: replyText,
        sender: "chatbot",
        isLoading: false,
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ]);
    setIsLoading(false);
  }

  function clearMessage() {
    setChatMessages([]);
    localStorage.clear("messages");
  }

  return (
    <div className="flex justify-center items-center p-4 bg-white border-t sm:border-gray-200">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        onKeyDown={saveInputTextByKey}
        value={inputText}
        className="flex-grow px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm sm:text-base mr-3"
      />
      <button
        onClick={sendMessage}
        className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors mr-2 text-sm sm:text-base shadow-sm"
      >
        Send
      </button>
      <button
        onClick={clearMessage}
        className="px-5 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-full transition-colors text-sm sm:text-base"
      >
        Clear
      </button>
    </div>
  );
}

export default ChatInput;