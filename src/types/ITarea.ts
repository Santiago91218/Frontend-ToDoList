export interface ITarea {
  id?: number;
  titulo: string;
  descripcion: string;
  estado?: "Pendiente" | "Progreso" | "Completado";
  fechaLimite: string;
  sprintId?: string;
}
