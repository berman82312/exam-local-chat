import type { User } from "../types/models";
import { MessageType } from "../types/models";
import { BaseChannel } from "./BaseChannel";

interface UserChannelData {
  user: User;
  action: MessageType.Join | MessageType.Leave;
}

class UserChannel extends BaseChannel<UserChannelData> {
  constructor() {
    super("chat-users");
  }

  join(user: User) {
    this.send({
      action: MessageType.Join,
      user,
    });
  }

  leave(user: User) {
    this.send({
      action: MessageType.Leave,
      user,
    });
  }
}

export const userChannel = new UserChannel();
