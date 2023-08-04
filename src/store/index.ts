import { create } from "zustand";

type State = {
  isUserLogged: boolean;
};

type Action = {
  login: () => void;
  logout: () => void;
};

export const useStore = create<State & Action>((set) => ({
  isUserLogged: false,
  login: () => {
    set(() => ({ isUserLogged: true }));
  },
  logout: () => {
    set(() => ({ isUserLogged: false }));
  },
}));
