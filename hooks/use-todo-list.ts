import { useAuth } from "@/components/context/auth-context";
import { Task } from "@/constants/types";
import getTodoService from "@/services/todo-service";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";


export default function useTodoList() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [todos, setTodos] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [creatingNew, setCreatingNew] = useState<boolean>(false);

    const todoService = useMemo(
        () => (user ? getTodoService({ token: user.token }) : null),
        [user]
    );

    const fetchTodos = useCallback(async () => {
        if (!user || !todoService) return;
        setLoading(true);
        try {
            const response = await todoService.getTodos();
            setTodos(response.data);
        } catch (error) {
            if (error instanceof Error && error.message.includes("No autorizado")) {
                Alert.alert("Sesión expirada", "Por favor, loguéate de nuevo.");
                logout();
                router.replace("/login");
            }
        } finally {
            setLoading(false);
        }
    }, [user, todoService, logout, router]);

    useEffect(() => {
        if (user) {
            fetchTodos();
        }
    }, [user, fetchTodos]);

    const onTaskCreated = () => {
        fetchTodos();
        setCreatingNew(false);
    };

    const toggleTodo = async (id: string) => {
        setLoading(true);
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
        const updatedTodo = todos.find((todo) => todo.id === id);
        if (todoService && updatedTodo !== undefined) {
            updatedTodo.completed = !updatedTodo.completed;
            try {
                await todoService.updateTodo(updatedTodo);
                await fetchTodos();
            } catch (error) {
                Alert.alert("Error", (error as Error).message);
            }
        }
        setLoading(false);
    };

    const removeTodo = async (id: string) => {
        setLoading(true);
        await todoService?.deleteTodo(id);
        await fetchTodos();
        setLoading(false);
    };

    const handleNewTaskClose = () => {
        setCreatingNew(false);
    };

    return {
        todos,
        loading,
        creatingNew,
        setCreatingNew,
        onTaskCreated,
        toggleTodo,
        removeTodo,
        handleNewTaskClose,
        user
    };
}