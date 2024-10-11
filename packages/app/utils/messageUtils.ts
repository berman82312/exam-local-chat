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

export function isSystemMessage(message: Message) {
  const systemMessageTypes = [MessageType.Join, MessageType.Leave];

  return systemMessageTypes.includes(message.type);
}

export function getMessageTime(message: Message) {
  const createdAt = new Date(message.createdAt);
  const hours = createdAt.getHours();
  const minutes = createdAt.getMinutes();

  const hourStr = `0${hours}`.slice(-2);
  const minuteStr = `0${minutes}`.slice(-2);

  return `${hourStr}:${minuteStr}`;
}
