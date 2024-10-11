import { useEffect } from "react";
import { chatChannel } from "../lib/chatChannel";
import { userChannel } from "../lib/userChannel";
import { useMembersStore } from "../stores/chatMembers";
import { useMessagesStore } from "../stores/chatMessages";
import { useUserStore } from "../stores/user";
import { MessageType, type User } from "../types/models";
import { createMessage } from "../utils/messageUtils";
import { generateId } from "../utils/userUtils";

export const useLoginUser = () => {
  const { join, leave } = useMembersStore();
  const { user, setUser } = useUserStore();
  const addMessage = useMessagesStore((state) => state.send);

  useEffect(() => {
    const unsubscribe = userChannel.onReceive(({ action, user }) => {
      if (action === MessageType.Join) {
        join(user);
      }
      if (action === MessageType.Leave) {
        leave(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [join, leave]);

  useEffect(() => {
    function handleFirstJoin(user: User) {
      const message = createMessage(
        user,
        `${user.name} joined`,
        MessageType.Join,
      );
      addMessage(message);
      chatChannel.send(message);
    }

    function handleJoin(user: User) {
      const isFirstJoin = join(user);
      userChannel.join(user);

      if (isFirstJoin) {
        handleFirstJoin(user);
      }
    }
    if (user) {
      handleJoin(user);
    }
  }, [user, join, addMessage]);

  function login(name: string) {
    const user = {
      id: generateId(),
      name,
    } satisfies User;
    setUser(user);
  }

  function logout(user: User) {
    const isLastLeave = leave(user);
    userChannel.leave(user);

    if (isLastLeave) {
      handleLastLeave(user);
    }
  }

  function handleLastLeave(user: User) {
    const message = createMessage(user, `${user.name} left`, MessageType.Leave);
    addMessage(message);
    chatChannel.send(message);
  }

  return {
    user,
    login,
    logout,
  };
};
