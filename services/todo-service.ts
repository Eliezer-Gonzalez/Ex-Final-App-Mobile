import { API_URL } from "@/constants/config";
import { Task } from "@/constants/types";
import axios, { isAxiosError } from "axios";

export interface GetTodosResponse {
  success: boolean;
  data: Task[];
  count: number;
}

export default function getTodoService({ token }: { token: string }) {
  function handleServiceError(error: unknown): never {
    if (isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        throw new Error("No autorizado. Favor loguéate.");
      }
    }
    console.error("Error al conectar al server:", error);
    throw new Error("Error al conectar al server. Intenta luego.");
  }
  
  const client = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  async function getTodos(): Promise<GetTodosResponse> {
    try {
      const response = await client.get<GetTodosResponse>("/todos");
      return response.data;
    } catch (error) {
      return handleServiceError(error);
    }
  }
  async function createTodo(task: Task): Promise<void> {
    try {
      await client.post("/todos", task);
    } catch (error) {
      return handleServiceError(error);
    }
  }

  async function deleteTodo(id: string): Promise<void> {
    try {
      await client.delete(`/todos/${id}`);
    } catch (error) {
      return handleServiceError(error);
    }
  }

  async function updateTodo(task: Task): Promise<void> {
    try {
      await client.put(`/todos/${task.id}`, task);
    } catch (error) {
      return handleServiceError(error);
    }
  }

  return {
    getTodos,
    createTodo,
    deleteTodo,
    updateTodo,
  };
}
