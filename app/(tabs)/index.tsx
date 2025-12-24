import TaskItem from "@/components/task-item";
import { IconSymbol } from "@/components/ui/icon-symbol";
import NewTask from "@/components/ui/new-task";
import Title from "@/components/ui/title";
import useTodoList from "@/hooks/use-todo-list";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { 
    todos, 
    loading,
    creatingNew, 
    setCreatingNew, 
    toggleTodo, 
    removeTodo, 
    onTaskCreated, 
    handleNewTaskClose,
    user } = useTodoList();

  if (creatingNew) {
    return (
      <SafeAreaView style={styles.container}>
        <NewTask onClose={handleNewTaskClose} onTaskCreated={onTaskCreated} />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Title style={{ alignSelf: "center", marginBottom: 15 }}>
        Bienvenido a tu Todo List,{" "}
        <Text style={{ fontWeight: "bold", color: "#1bf03eff" }}>
          {user?.email}
        </Text>
      </Title>
      {loading && <Title>Cargando...</Title>}
      <LinearGradient
        colors={["transparent", "#0dcc2dff", "transparent"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          height: 2.5, 
        }}
      />
      <View style={styles.listBackground}>
        {todos.map((todo) => (
          <TaskItem
            key={todo.id}
            task={todo}
            onToggle={toggleTodo}
            onRemove={removeTodo}
            loading={loading}
          />
        ))}
      </View>
      <TouchableOpacity
        style={styles.newTaskButton}
        onPress={() => setCreatingNew(true)}
      >
        <IconSymbol name="plus" size={30} weight="bold" color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: "#000000ff",
  },
  newTaskButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#0dcc2dff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  listBackground: {
    flex: 1,
    backgroundColor: "#000000ff",
    marginHorizontal: -22,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
