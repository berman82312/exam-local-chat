import type { Message } from "../types/models";

class ChatChannel {
  name = "chat-message";
  channel: BroadcastChannel;
  constructor() {
    this.channel = new BroadcastChannel(this.name);
  }

  send(data: any) {
    this.channel.postMessage(data);
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
