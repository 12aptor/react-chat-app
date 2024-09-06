import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Hash, Send } from "lucide-react";
import { getChannelsService } from "@/services/channel-services";
import { IChannel, IMessage, INewMessage } from "@/utils/types";
import { getMessagesService } from "@/services/message-services";
import { socket } from "@/lib/socket-io";
import toast from "react-hot-toast";

export function ChannelChat() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentChannel, setCurrentChannel] = useState<IChannel | null>(null);
  const [channels, setChannels] = useState<IChannel[]>([]);

  useEffect(() => {
    getChannelsService().then((response) => {
      if (response) {
        setChannels(response.data);
      }
    });
  }, []);

  useEffect(() => {
    if (!currentChannel) {
      return;
    }

    socket.emit("join", currentChannel.id);

    socket.on("message", (mgs: IMessage) => {
      setMessages((prev) => [...prev, mgs]);
    });

    return () => {
      socket.off("message");
    };
  }, [currentChannel]);

  const toggleChannel = (channel: IChannel) => {
    if (currentChannel && currentChannel.name === channel.name) {
      return;
    }

    setCurrentChannel(channel);

    getMessagesService(channel.id).then((response) => {
      if (response) {
        setMessages(response.data);
      }
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentChannel) {
      toast.error("Debes seleccionar un canal");
      return;
    }

    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      toast.error("Debes iniciar sesión para enviar un mensaje");
      return;
    }

    const payload = jwt.split(".")[1];
    const decoded = JSON.parse(atob(payload));

    if (inputMessage.trim() !== "") {
      const message: INewMessage = {
        content: inputMessage,
        author_id: decoded.id,
        channel_id: currentChannel.id,
      };

      socket.emit("message", message);

      setInputMessage("");
    }
  };

  return (
    <div className="flex h-screen text-gray-800 bg-white">
      <div className="w-60 border-r p-4">
        <h2 className="text-lg font-semibold mb-4">Canales</h2>
        <ul className="space-y-2">
          {channels.map((channel) => (
            <li
              key={channel.id}
              className={`flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded ${
                currentChannel?.name === channel.name ? "bg-gray-100" : ""
              }`}
              onClick={() => toggleChannel(channel)}
            >
              <Hash className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">{channel.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="border-b p-4">
          <h1 className="text-xl font-bold text-gray-700">
            {currentChannel ? `#${currentChannel.name}` : "Selecciona un canal"}
          </h1>
        </div>
        <ScrollArea className="flex-1 p-4">
          {messages.map((message) => (
            <div key={message.id} className="mb-4">
              <img
                src={message.author.avatar}
                alt="Avatar de usuario"
                height={40}
                width={40}
                className="rounded-full"
              />
              <span className="font-semibold text-gray-800">
                {message.author.username}:{" "}
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
