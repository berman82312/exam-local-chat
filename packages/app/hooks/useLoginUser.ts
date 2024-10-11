import { useEffect } from "react";
import { useMembersStore } from "../stores/chatMembers";
import { useUserStore } from "../stores/user";
import type { User } from "../types/models";
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
      return user.name;
      // handle first join
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
    isLogin: !!user,
    login,
  };
};
