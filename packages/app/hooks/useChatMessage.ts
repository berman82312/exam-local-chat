import { useMessagesStore } from "../stores/chatMessages";
import type { User } from "../types/models";
import { MessageType } from "../types/models";
import { createMessage } from "../utils/messageUtils";

export const useChatMessage = () => {
  const addMessage = useMessagesStore((state) => state.send);

  function send(user: User, content: string) {
    const message = createMessage(user, content, MessageType.Text);
    addMessage(message);
  }

  return {
    send,
  };
};
