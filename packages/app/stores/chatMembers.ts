import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/models";

interface MembersState {
  members: Record<string, User["id"][]>;
}

type isFirstJoin = boolean;
type isLastLeave = boolean;

interface MembersAction {
  join: (user: User) => isFirstJoin;
  leave: (user: User) => isLastLeave;
}

interface MembersStore extends MembersState, MembersAction {}

export const useMembersStore = create<MembersStore>()(
  persist(
    (set, get) => ({
      members: {},
      join: (user) => {
        const members = get().members;
        const currentIdList = members[user.name] ?? [];
        if (currentIdList.includes(user.id)) {
          return false;
        }
        const newList = currentIdList.concat([user.id]);
        set({
          members: {
            ...members,
            [user.name]: newList,
          },
        });
        return currentIdList.length === 0;
      },
      leave: (user) => {
        const members = get().members;
        const currentIdList = members[user.name] ?? [];
        const existIndex = currentIdList.indexOf(user.id);
        if (existIndex < 0) {
          return false;
        }
        const newList = currentIdList
          .slice(0, existIndex)
          .concat(currentIdList.slice(existIndex + 1));
        set({
          members: {
            ...members,
            [user.name]: newList,
          },
        });
        return newList.length === 0;
      },
    }),
    {
      name: "chat-room-members",
      partialize: (state) => ({ members: state.members }),
    },
  ),
);
