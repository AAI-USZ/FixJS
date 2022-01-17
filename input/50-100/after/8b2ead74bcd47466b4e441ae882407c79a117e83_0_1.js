function toggleCompleted(todo) {
  //find and toggle done on todos or todo and push new todos
  if (todo === undefined) {
    if (allmarkt()) {
      setDoneOnAll(false);
    } else {
      setDoneOnAll(true);
    }
    ss.rpc('todo.update', todosLocal);

  } else {
    toggleDone(todo);
    ss.rpc('todo.update', todosLocal);
  }
}