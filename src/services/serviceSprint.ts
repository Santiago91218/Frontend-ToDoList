import axios from "axios";
import { ISprint } from "../types/ISprint";

const sprintService = import.meta.env.VITE_API_URL_SPRINT;

export class ServiceSprint {
  private baseURLsprint: string;

  constructor() {
    this.baseURLsprint = sprintService;
  }

  public async getAllSprints(): Promise<any[]> {
    try {
      const url = `${this.baseURLsprint}`;
      const response = await axios.get<any[]>(url);

      return response.data || [];
    } catch (error) {
      console.error("Error al obtener tareas:", error);
      return [];
    }
  }

  public async createSprint(sprint: ISprint): Promise<any> {
    try {
      const url = `${this.baseURLsprint}`;
      const response = await axios.post(url, sprint);
      return response.data;
    } catch (error) {
      console.log("Error al crear sprint:", error);
      return null;
    }
  }

  public async editSprint(id: number, sprint: ISprint): Promise<any> {
    try {
      const url = `${this.baseURLsprint}/${id}`;
      const response = await axios.put(url, sprint);
      return response;
    } catch (error) {
      console.log("Error al editar una sprint: ", error);
    }
  }

  public async addTaskSprint(idSprint: number, idTask: number): Promise<any> {
    try {
      const url = `${this.baseURLsprint}/${idSprint}/add-task/${idTask}`;

      const response = await axios.put(url);

      return response;
    } catch (error) {
      console.log("Error al añadir una tarea a la sprint: ", error);
    }
  }

  public async moveTaskBacklog(idSprint: number, idTask: number): Promise<any> {
    try {
      const url = `${this.baseURLsprint}/${idSprint}/move-task-backlog/${idTask}`;

      const response = await axios.put(url);

      return response;
    } catch (error) {
      console.log("Error al mover una tarea a la backlog: ", error);
    }
  }

  public async deleteTask(idSprint: number): Promise<any> {
    try {
      const url = `${this.baseURLsprint}/${idSprint}`;

      const response = await axios.delete(url);

      return response;
    } catch (error) {
      console.log("Error al eliminar una sprint: ", error);
    }
  }
}
