import type { User } from "../types/models";

export function generateId() {
  return Math.round(Math.random() * 1e16).toString();
}

export function isSameUser(user1: User, user2: User) {
  return user1.name === user2.name;
}
