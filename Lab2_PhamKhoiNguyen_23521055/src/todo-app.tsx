/** @jsx createElement */
import { createElement, useState } from "./jsx-runtime";
import "./todo-app.css";

// ----- Interfaces -----
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

interface AddTodoFormProps {
  onAdd: (text: string) => void;
}

interface TodoAppProps {
  initialTodos?: Todo[];
}

// ----- TodoItem -----
const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => (
  <li
    className={`todo-item ${todo.completed ? "completed" : ""}`}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "6px 0",
    }}
  >
    <label style={{ flex: 1, cursor: "pointer" }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          marginLeft: "8px",
        }}
      >
        {todo.text}
      </span>
    </label>
    <button
      onClick={() => onDelete(todo.id)}
      style={{
        marginLeft: "8px",
        background: "none",
        border: "none",
        color: "#d33",
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      ✕
    </button>
  </li>
);

// ----- AddTodoForm -----
const AddTodoForm = ({ onAdd }: AddTodoFormProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector("input")!;
    const value = input.value.trim();
    if (!value) return;
    onAdd(value);
    input.value = "";
  };

  return (
    <form onSubmit={handleSubmit as any} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e: any) => (text = e.target.value)}
        placeholder="Enter a new todo..."
      />
      <button type="submit">Add</button>
    </form>
  );
};

// ----- TodoApp -----
export const TodoApp = ({ initialTodos = [] }: TodoAppProps) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="todo-app">
      <h2>Todo List</h2>
      <AddTodoForm onAdd={addTodo} />
      <ul className="todo-list">
        {todos.map((t) => (
          <TodoItem todo={t} onToggle={toggleTodo} onDelete={deleteTodo} />
        ))}
      </ul>
      <p>
        Total: {todos.length} | Completed: {completedCount}
      </p>
    </div>
  );
};
