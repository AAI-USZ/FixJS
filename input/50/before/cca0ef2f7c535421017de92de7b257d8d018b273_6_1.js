function() {
    if ( !$scope.newTodo.length ) {
      return;
    }

    todos.push({
      title: this.newTodo,
      completed: false
    });

    this.newTodo = '';
  }