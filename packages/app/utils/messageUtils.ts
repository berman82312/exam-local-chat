import { cloneDeep } from "lodash/fp";
import type { Message, User } from "../types/models";
import { MessageType } from "../types/models";

function generateId() {
  return Math.round(Math.random() * 1e16).toString();
}

export function createMessage(
  sender: User,
  content: string,
  messageType: MessageType,
): Message {
  return {
    id: generateId(),
    user: cloneDeep(sender),
    content,
    createdAt: new Date().toISOString(),
    type: messageType,
  };
}

export function isInfoMessage(message: Message) {
  const infoMessageTypes = [MessageType.Join, MessageType.Leave];

  return infoMessageTypes.includes(message.type);
}
