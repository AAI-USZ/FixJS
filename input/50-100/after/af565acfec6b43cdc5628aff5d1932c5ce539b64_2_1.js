function(event)
  {
    event.preventDefault();
    var delete_link = $(event.currentTarget);
    var id = parseInt(delete_link.attr('id').replace("todo-delete-", ""));
    modal = new MethodTodo.Views.DeleteTodoModal(id);
  }