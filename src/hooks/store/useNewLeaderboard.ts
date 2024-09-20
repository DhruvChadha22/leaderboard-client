import { create } from "zustand";

type NewLeaderboardState = {
    isInvalid: boolean;
    invalidateLeaderboard: () => void;
    revalidateLeaderboard: () => void;
};

export const useNewLeaderboard = create<NewLeaderboardState>((set) => ({
    isInvalid: false,
    invalidateLeaderboard: () => set({ isInvalid: true }),
    revalidateLeaderboard: () => set({ isInvalid: false }),
}));
