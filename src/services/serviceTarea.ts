import axios from "axios";
import { ITarea } from "../types/ITarea";

const backlogService = import.meta.env.VITE_API_URL_BACKLOG;
const tareaService = import.meta.env.VITE_API_URL_TASKS;

export class ServiceTarea {
  private baseURLbacklog: string;
  private baseURLtarea: string;

  constructor() {
    this.baseURLbacklog = backlogService;
    this.baseURLtarea = tareaService;
  }

  public async getAllTasks(): Promise<any[]> {
    try {
      const url = `${this.baseURLbacklog}`;
      const response = await axios.get<any[]>(url);

      return response.data[0]?.tareas || [];
    } catch (error) {
      console.log("Error al obtener tareas:", error);
      return [];
    }
  }

  public async createTask(tarea: ITarea): Promise<any> {
    try {
      const url = `${this.baseURLtarea}`;
      const response = await axios.post(url, tarea);
      return response.data;
    } catch (error) {
      console.log("Error al crear tarea:", error);
      return null;
    }
  }

  public async editTask(id: number, tarea: ITarea): Promise<any> {
    try {
      const url = `${this.baseURLtarea}/${id}`;
      const response = await axios.put(url, tarea);
      return response;
    } catch (error) {
      console.log("Error al editar una tarea: ", error);
    }
  }

  public async updateStateTask(idTask: number, estado: string): Promise<any> {
    try {
      const url = `${this.baseURLtarea}/update-state/${idTask}`;

      const response = await axios.put(url, { estado });

      return response;
    } catch (error) {
      console.log("Error al actualizar el estado de una tarea: ", error);
    }
  }

  public async deleteTask(idTask: number): Promise<any> {
    try {
      const url = `${this.baseURLtarea}/${idTask}`;

      const response = await axios.delete(url);

      return response;
    } catch (error) {
      console.log("Error al eliminar una tarea: ", error);
    }
  }
}
