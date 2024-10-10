import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/models";

interface MembersState {
  members: Record<string, number>;
}

interface MembersAction {
  join: (user: User) => number;
  leave: (user: User) => number;
}

interface MembersStore extends MembersState, MembersAction {}

export const useMembersStore = create<MembersStore>()(
  persist(
    (set, get) => ({
      members: {},
      join: (user) => {
        const members = get().members;
        const currentUserCount = members[user.name] ?? 0;
        const newCount = currentUserCount + 1;
        set({
          members: Object.assign({}, members, {
            [user.name]: newCount,
          }),
        });
        return newCount;
      },
      leave: (user) => {
        const members = get().members;
        const currentUserCount = members[user.name];
        if (!currentUserCount) {
          return 0;
        }
        const newCount = currentUserCount - 1;
        set({
          members: Object.assign({}, members, {
            [user.name]: newCount,
          }),
        });
        return newCount;
      },
    }),
    {
      name: "chat-room-members",
      partialize: (state) => ({ members: state.members }),
    },
  ),
);
