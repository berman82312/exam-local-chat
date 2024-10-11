import { type Message, MessageType, type User } from "../types/models";
import { createMessage } from "../utils/messageUtils";

class ChatChannel {
  name = "chat-message";
  channel: BroadcastChannel;
  constructor() {
    this.channel = new BroadcastChannel(this.name);
  }

  send(data: any) {
    this.channel.postMessage(data);
  }

  userJoin(user: User) {
    const message = createMessage(
      user,
      `${user.name} joined`,
      MessageType.Join,
    );
    this.send(message);

    return message;
  }

  onReceive(cb: (message: Message) => void) {
    const handler = (e: MessageEvent) => cb(e.data);
    this.channel.addEventListener("message", handler);

    return () => {
      this.channel.removeEventListener("message", handler);
    };
  }
}

export const chatChannel = new ChatChannel();
