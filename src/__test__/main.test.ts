/**
 * @jest-environment jsdom
 */

import * as main from "../ts/main";
import * as func from "../ts/functions";
import { Todo } from "../ts/models/Todo";

beforeEach(() => {
  document.body.innerHTML = "";
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("clearTodos function", () => {
  it("calls removeAllTodos function", () => {
    document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
    const spy = jest.spyOn(func, "removeAllTodos").mockReturnValue();
    main.clearTodos([]);
    expect(spy).toHaveBeenCalled();
  });
});

describe("createHtml function", () => {
  it("creates HTML", () => {
    document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
    const HTMLSpy = jest.spyOn(main, "createHtml").mockReturnValue();
    main.createHtml([]);
    expect(HTMLSpy).toHaveBeenCalledTimes(1);
    HTMLSpy.mockRestore();
  });
});

describe("displayError function", () => {
  it("displays error", () => {
    document.body.innerHTML = `<div id="error" class="error"></div>`;
    const errorString = "An error string";
    const showError = true;
    main.displayError(errorString, showError);
    const errorElement = document.querySelector("#error");
    expect(errorElement?.classList.contains("show")).toBeTruthy();
  });

  it("removes error", () => {
    document.body.innerHTML = `<div id="error" class="error show"></div>`;
    const errorString = "An error string";
    const showError = false;
    main.displayError(errorString, showError);
    const errorElement = document.querySelector("#error");
    expect(errorElement?.classList.contains("show")).toBeFalsy();
  });
});

describe("CreateOrNotCreateTodo function", () => {
  it("creates new todo", () => {
    document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
    const todoText = "Random Text";
    const todos: Todo[] = [];
    main.createNewTodo(todoText, todos);
    expect(document.querySelector("#todos")?.innerHTML).toEqual(
      `<li class="todo__text">${todoText}</li>`
    );
  });

  it("Not create new todo", () => {
    document.body.innerHTML =
      '<div id="error" class="error"></div>' +
      '<ul id="todos" class="todo"></ul>';

    const todoText = "A";
    const todos: Todo[] = [];

    main.createNewTodo(todoText, todos);

    expect(
      document.querySelector("#error")?.classList.contains("show")
    ).toBeTruthy();
  });
});
