import type { Message } from "../types/models";
import { BaseChannel } from "./BaseChannel";

class ChatChannel extends BaseChannel<Message> {
  constructor() {
    super("chat-message");
  }
}

export const chatChannel = new ChatChannel();
