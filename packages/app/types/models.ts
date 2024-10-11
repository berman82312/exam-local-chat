export interface User {
  id: string;
  name: string;
}

export enum MessageType {
  Join = "join",
  Leave = "leave",
  Text = "text",
}

export interface Message {
  id: string;
  type: MessageType;
  user: User;
  content: string;
  createdAt: string;
}
