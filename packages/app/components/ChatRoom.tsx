import { ChatMessages } from "./ChatMessages";
import { ChatMessageSender } from "./ChatMessageSender";

export const ChatRoom = () => {
  return (
    <div className="flex flex-col h-screen">
      <ChatMessages />
      <ChatMessageSender />
    </div>
  );
};
