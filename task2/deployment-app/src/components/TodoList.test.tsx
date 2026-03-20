import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoList } from "./TodoList";

describe("TodoList Component", () => {
  describe("Rendering", () => {
    test("renders empty todo list", () => {
      render(<TodoList />);

      expect(screen.getByText("Todo List")).toBeInTheDocument();
      expect(screen.getByTestId("todo-count")).toHaveTextContent(
        "0 todos (0 completed)"
      );
    });

    test("renders with initial todos", () => {
      const initialTodos = [
        { id: 1, text: "Test todo", completed: false }
      ];

      render(<TodoList initialTodos={initialTodos} />);

      expect(screen.getByText("Test todo")).toBeInTheDocument();
      expect(screen.getByTestId("todo-count")).toHaveTextContent(
        "1 todos (0 completed)"
      );
    });
  });

  describe("Adding todos", () => {
    test("adds a new todo via button click", async () => {
      const user = userEvent.setup();

      render(<TodoList />);

      const input = screen.getByTestId("todo-input");
      const addButton = screen.getByTestId("add-button");

      await user.type(input, "New todo item");
      await user.click(addButton);

      expect(screen.getByText("New todo item")).toBeInTheDocument();
      expect(input).toHaveValue("");
    });
  });
});