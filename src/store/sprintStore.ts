import { create } from "zustand";
import { ISprint } from "../types/ISprint";

interface ISprintStore {
  sprints: ISprint[];
  sprintActiva: ISprint | null;
  setSprintActiva: (sprintActiva: ISprint | null) => void;
}

export const sprintStore = create<ISprintStore>()((set) => ({
  sprints: [],
  sprintActiva: null,

  setSprintActiva: (sprintActivaIn) =>
    set(() => ({ sprintActiva: sprintActivaIn })),
}));
