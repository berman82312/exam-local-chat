import { useEffect } from "react";
import { chatChannel } from "../lib/chatChannel";
import { useMessagesStore } from "../stores/chatMessages";
import type { Message, User } from "../types/models";
import { MessageType } from "../types/models";
import { createMessage } from "../utils/messageUtils";

export const useChatMessage = () => {
  const addMessage = useMessagesStore((state) => state.send);

  useEffect(() => {
    function handleReceivedMessage(message: Message) {
      addMessage(message);
    }

    const unsubscribe = chatChannel.onReceive(handleReceivedMessage);

    return () => {
      unsubscribe();
    };
  }, [addMessage]);

  function send(user: User, content: string) {
    const message = createMessage(user, content, MessageType.Text);
    addMessage(message);
    chatChannel.send(message);
  }

  return {
    send,
  };
};
