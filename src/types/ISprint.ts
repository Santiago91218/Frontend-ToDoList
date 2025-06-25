import { ITarea } from "./ITarea";

export interface ISprint {
  id?: number;
  fechaInicio: string;
  fechaCierre: string;
  titulo: string;
  tareas: ITarea[];
}
