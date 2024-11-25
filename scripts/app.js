(async function init() {
  // Fetch todos from database
  const todos = await server.getTodos();

  // Render todos to UI
  ui.renderTodos(todos);
})();
