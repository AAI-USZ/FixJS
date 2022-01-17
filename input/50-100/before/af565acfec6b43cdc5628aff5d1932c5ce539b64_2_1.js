function(event)
  {
    event.preventDefault();
    var delete_link = $(event.currentTarget);
    var id = parseInt(delete_link.attr('id').replace("todo-delete-", ""));
    $('#delete-todo-id').html(id);
    $('#delete-todo-modal').modal('show');
  }