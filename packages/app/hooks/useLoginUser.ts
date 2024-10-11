import { useEffect } from "react";
import { chatChannel } from "../lib/chatChannel";
import { useMembersStore } from "../stores/chatMembers";
import { useUserStore } from "../stores/user";
import { MessageType, type User } from "../types/models";
import { createMessage } from "../utils/messageUtils";
import { generateId } from "../utils/userUtils";

export const useLoginUser = () => {
  const { join } = useMembersStore();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    function handleUserJoin(user: User) {
      const isFirstJoin = join(user);
      if (isFirstJoin) {
        handleFirstJoin(user);
      }
    }

    function handleFirstJoin(user: User) {
      const message = createMessage(
        user,
        `${user.name} joined`,
        MessageType.Join,
      );
      chatChannel.send(message);
    }

    if (user) {
      handleUserJoin(user);
    }
  }, [user, join]);

  function login(name: string) {
    setUser({
      id: generateId(),
      name,
    });
  }

  return {
    user,
    login,
  };
};
