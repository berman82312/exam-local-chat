import { useEffect } from "react";
import { chatChannel } from "../lib/chatChannel";
import { useMembersStore } from "../stores/chatMembers";
import { useMessagesStore } from "../stores/chatMessages";
import { useUserStore } from "../stores/user";
import type { User } from "../types/models";
import { generateId } from "../utils/userUtils";

export const useLoginUser = () => {
  const { join } = useMembersStore();
  const { user, setUser } = useUserStore();
  const addMessage = useMessagesStore((state) => state.send);

  useEffect(() => {
    function handleUserJoin(user: User) {
      const isFirstJoin = join(user);
      if (isFirstJoin) {
        handleFirstJoin(user);
      }
    }

    function handleFirstJoin(user: User) {
      const message = chatChannel.userJoin(user);
      addMessage(message);
    }

    if (user) {
      handleUserJoin(user);
    }
  }, [user, join, addMessage]);

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
