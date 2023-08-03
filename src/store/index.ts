import { create } from "zustand";

type State = {
  isUserLogged: boolean;
};

type Action = {
  updateUserLogged: (value: State["isUserLogged"]) => void;
};

export const useStore = create<State & Action>((set) => ({
  isUserLogged: false,
  updateUserLogged: (value) => set(() => ({ isUserLogged: value })),
}));
