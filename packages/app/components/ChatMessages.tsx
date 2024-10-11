import { useEffect, useRef } from "react";
import { useLoginUser } from "../hooks/useLoginUser";
import { useMessagesStore } from "../stores/chatMessages";
import type { Message } from "../types/models";
import { isSystemMessage } from "../utils/messageUtils";
import { isSameUser } from "../utils/userUtils";

interface MessageProps {
  message: Message;
}

interface MessageItemProps extends MessageProps {
  isMe: boolean;
}

const MiddleMessage = ({ message }: MessageProps) => {
  return (
    <div className="flex items-center justify-center">
      <p className="p-2 text-xs bg-gray-800/50 rounded-full my-2">
        {message.content}
      </p>
    </div>
  );
};

const MyMessage = ({ message }: MessageProps) => {
  return (
    <div className="my-2 flex flex-col items-end">
      <p className="text-xs text-gray-400">Me</p>
      <p className="p-2 bg-sky-800 rounded-md whitespace-pre-wrap max-w-full ml-16">
        {message.content}
      </p>
    </div>
  );
};

const OtherMessage = ({ message }: MessageProps) => {
  return (
    <div className="my-2 flex flex-col items-start">
      <p className="text-xs text-gray-400">{message.user.name}</p>
      <p className="p-2 bg-gray-800 rounded-md whitespace-pre-wrap max-w-full mr-16">
        {message.content}
      </p>
    </div>
  );
};

const MessageItem = ({ message, isMe }: MessageItemProps) => {
  if (isSystemMessage(message)) {
    return <MiddleMessage message={message} />;
  }

  if (isMe) {
    return <MyMessage message={message} />;
  }

  return <OtherMessage message={message} />;
};

export const ChatMessages = () => {
  const { user } = useLoginUser();
  const messages = useMessagesStore((state) => state.messages);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleNewestIsMe(message: Message) {
      if (isSystemMessage(message)) {
        return;
      }

      if (message.user.name !== user?.name) {
        return;
      }

      listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }

    const lastMessage = messages[0];

    if (lastMessage) {
      handleNewestIsMe(lastMessage);
    }
  }, [messages, user]);

  return (
    <div
      ref={listRef}
      className="flex flex-grow flex-col-reverse overflow-auto"
      style={{
        colorScheme: "dark",
      }}
    >
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          isMe={user ? isSameUser(user, message.user) : false}
        />
      ))}
    </div>
  );
};
