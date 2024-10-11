export class BaseChannel<T> {
  name: string;
  channel: BroadcastChannel;
  constructor(name: string) {
    this.name = name;
    this.channel = new BroadcastChannel(name);
  }

  send(data: T) {
    this.channel.postMessage(data);
  }

  onReceive(cb: (data: T) => void) {
    const handler = (e: MessageEvent) => cb(e.data);
    this.channel.addEventListener("message", handler);

    return () => {
      this.channel.removeEventListener("message", handler);
    };
  }
}
