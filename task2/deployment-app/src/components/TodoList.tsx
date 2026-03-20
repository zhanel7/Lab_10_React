import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  initialTodos?: Todo[];
}

export function TodoList({ initialTodos = [] }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      const todoItem: Todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false
      };

      setTodos([...todos, todoItem]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="todoWrapper">
      <h1>Todo List</h1>

      <div className="todoInputContainer">
        <input
          type="text"
          data-testid="todo-input"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new todo..."
          className="todoInput"
        />

        <button
          data-testid="add-button"
          onClick={addTodo}
          className="addButton"
        >
          Add
        </button>
      </div>

      <ul data-testid="todo-list" className="todoList">
        {todos.map((todo) => (
          <li
            key={todo.id}
            data-testid="todo-item"
            className={todo.completed ? "todoItem completed" : "todoItem"}
          >
            <input
              type="checkbox"
              data-testid="todo-checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />

            <span data-testid="todo-text">{todo.text}</span>

            <button
              data-testid="delete-button"
              onClick={() => deleteTodo(todo.id)}
              className="deleteButton"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div data-testid="todo-count" className="todoCount">
        {todos.length} todos ({completedCount} completed)
      </div>
    </div>
  );
}