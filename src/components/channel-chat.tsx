import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Hash, Send } from "lucide-react";

export function ChannelChat() {
  const [messages, setMessages] = useState([
    { id: 1, author: "Usuario1", content: "Hola a todos!" },
    { id: 2, author: "Usuario2", content: "¡Bienvenidos al canal!" },
    { id: 3, author: "Usuario3", content: "¿Cómo están?" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentChannel, setCurrentChannel] = useState("general");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      setMessages([
        ...messages,
        { id: messages.length + 1, author: "Tú", content: inputMessage },
      ]);
      setInputMessage("");
    }
  };

  return (
    <div className="flex h-screen text-gray-800 bg-white">
      <div className="w-60 border-r p-4">
        <h2 className="text-lg font-semibold mb-4">Canales</h2>
        <ul className="space-y-2">
          {["general", "random", "ayuda", "anuncios"].map((channel) => (
            <li
              key={channel}
              className={`flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded ${
                currentChannel === channel ? "bg-gray-100" : ""
              }`}
              onClick={() => setCurrentChannel(channel)}
            >
              <Hash className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">{channel}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="border-b p-4">
          <h1 className="text-xl font-bold text-gray-700">#{currentChannel}</h1>
        </div>
        <ScrollArea className="flex-1 p-4">
          {messages.map((message) => (
            <div key={message.id} className="mb-4">
              <span className="font-semibold text-gray-800">
                {message.author}:{" "}
              </span>
              <span className="text-gray-700">{message.content}</span>
            </div>
          ))}
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Envía un mensaje..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" variant="outline">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
