import dayjs from "dayjs";
import Groq from "groq-sdk";
import { useState } from "react";
import { ChangeEvent , KeyboardEvent } from "react";
import type { ChatMessageData } from "../App";

interface ChatInputProps {
  chatMessages: ChatMessageData[];
  setChatMessages: (messages: ChatMessageData[]) => void;
}

function ChatInput({ chatMessages, setChatMessages } : ChatInputProps) {
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function saveInputText(event : ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  function saveInputTextByKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  async function sendMessage() {
    const messageText = inputText.trim();
    if (isLoading || messageText === "") return;
    setIsLoading(true);

    const newChatMessages = [
      ...chatMessages,
      {
        message: messageText,
        sender: "user",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ];
    setChatMessages(newChatMessages);

    // Store a flag instead of JSX
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
      apiKey: import.meta.env.VITE_GROQ_API_KEY, //  correct prefix
      dangerouslyAllowBrowser: true,
    });

    try {
      const response = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: messageText }],
      });
      const replyText = response.choices[0]?.message?.content;
      if (!replyText) throw new Error("The assistant returned an empty response.");

      setChatMessages([
        ...newChatMessages,
        { message: replyText, sender: "chatbot", id: crypto.randomUUID(), time: dayjs().valueOf() },
      ]);
    } catch (error) {
      console.error("Unable to send chat message", error);
      setChatMessages([
        ...newChatMessages,
        {
          message: "I couldn't send that message. Please check your API key and try again.",
          sender: "chatbot",
          id: crypto.randomUUID(),
          time: dayjs().valueOf(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function clearMessage() {
    setChatMessages([]);
    localStorage.removeItem("messages");
  }

  return (
    <div className="flex shrink-0 items-center justify-center gap-2 border-t border-gray-200 bg-white p-3 sm:gap-3 sm:px-6 sm:py-4">
      <input
        placeholder="Send a message to Chatbot"
        onChange={saveInputText}
        onKeyDown={saveInputTextByKey}
        value={inputText}
        className="min-w-0 flex-1 rounded-full border border-gray-300 px-4 py-3 text-sm transition-shadow focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-400 sm:text-base"
      />
      <button
        onClick={sendMessage}
        className="shrink-0 rounded-full bg-yellow-400 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-yellow-500 sm:px-5 sm:py-3 sm:text-base"
      >
        Send
      </button>
      <button
        onClick={clearMessage}
        className="shrink-0 rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-300 sm:px-5 sm:py-3 sm:text-base"
      >
        Clear
      </button>
    </div>
  );
}

export default ChatInput;