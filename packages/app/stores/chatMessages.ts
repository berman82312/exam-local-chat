import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Message } from "../types/models";

interface MessagesState {
  messages: Message[];
}

interface MessagesAction {
  send: (message: Message) => void;
}

interface MessagesStore extends MessagesState, MessagesAction {}

export const useMessagesStore = create<MessagesStore>()(
  persist(
    (set, get) => ({
      messages: [],
      send: (message) => {
        const messages = get().messages;
        const exists = messages.find((m) => m.id === message.id);
        if (exists) {
          return;
        }
        const insertAt = messages.findIndex(
          (m) => m.createdAt <= message.createdAt,
        );
        set({
          messages: [
            ...messages.slice(0, insertAt),
            message,
            ...messages.slice(insertAt),
          ],
        });
      },
    }),
    {
      name: "chat-room-messages",
      partialize: (state) => ({ messages: state.messages }),
    },
  ),
);
