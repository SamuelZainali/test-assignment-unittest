import { addTodo, changeTodo, removeAllTodos } from "../ts/functions";
import { Todo } from "../ts/models/Todo";

describe("Todo tests", () => {
  test("Add new todo", () => {
    const todoText = "Random Text";
    const todos: Todo[] = [];
    const result = addTodo(todoText, todos);
    expect(result.success).toBeTruthy();
  });

  test("Do not add a new todo", () => {
    const todoText = "A";
    const todos: Todo[] = [];
    const result = addTodo(todoText, todos);
    expect(result.success).toBeFalsy();
  });

  test("Change the todo state", () => {
    const todo: Todo = { text: "Random Text", done: false };
    changeTodo(todo);
    expect(todo.done).toBeTruthy();
  });

  test("Remove all todos", () => {
    const todos: Todo[] = [{ text: "Random Text", done: false }];
    removeAllTodos(todos);
    expect(todos.length).toBe(0);
  });
});
