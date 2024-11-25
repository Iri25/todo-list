const dom = {
  todosList: document.querySelector("#todos-list"),
  todoForm: document.querySelector("#todos-form"),
  todoInput: document.querySelector("#todos-input"),
};

const ui = {
  renderTodos(todos) {
    todos.forEach((todo) => {
      dom.todosList.insertAdjacentHTML(
        "beforeend",
        `<li>
          <input type="checkbox" ${todo.done ? "checked" : ""} id="${todo.id}"/>
          <label for="${todo.id}">${todo.title}</label>
          <button class="todos-delete-button" data-id="${
            todo.id
          }">Delete</button></li>
        </li>`
      );
    });
  },

  renderTodo(todo) {
    dom.todosList.insertAdjacentHTML(
      "beforeend",
      `<li>
        <input type="checkbox" ${todo.done ? "checked" : ""} id="${todo.id}"/>
        <label for="${todo.id}">${todo.title}</label>
        <button class="todos-delete-button" data-id="${
          todo.id
        }">Delete</button></li>
      </li>`
    );
  },

  async renderAddTodo(event) {
    event.preventDefault();

    const newTodo = {
      id: crypto.randomUUID(),
      title: dom.todoInput.value,
      done: false,
    };

    // Save todo on server
    const saveTodo = await server.addTodo(newTodo);

    if (saveTodo) {
      dom.todoInput.value = "";

      // Update todo to UI
      ui.renderTodo(saveTodo);
    }
  },

  async renderDeleteTodo(event) {
    // Check if clicked element is a delete button
    if (event.target.classList.contains("todos-delete-button")) {
      const elementTodo = event.target.closest("li");
      const idTodo = event.target.getAttribute("data-id");

      // Delete todo from server
      const deleteTodo = await server.deleteTodo(idTodo);

      if (deleteTodo) {
        elementTodo.remove();
      }
    }
  },

  async renderUpdateTodo(event) {
    // Check if checkbox is toggled
    if (event.target.matches('input[type="checkbox"]')) {
      const checkbox = event.target;
      const idTodo = event.target.id;

      const statusTodo = { done: checkbox.checked };

      // Update todo on server
      await server.updateTodo(statusTodo, idTodo);
    }
  },
};

dom.todoForm.addEventListener("submit", ui.renderAddTodo);
dom.todosList.addEventListener("click", ui.renderDeleteTodo);
dom.todosList.addEventListener("change", ui.renderUpdateTodo);
