import { create } from "zustand";
import { ITarea } from "../types/ITarea";

interface ITareaStore {
  tareas: ITarea[];
  tareaActiva: ITarea | null;
  setTareaActiva: (tareaActiva: ITarea | null) => void;
}

export const tareaStore = create<ITareaStore>((set) => ({
  tareas: [],
  tareaActiva: null,

  setTareaActiva: (tareaActivaIn) =>
    set(() => ({ tareaActiva: tareaActivaIn })),
}));
