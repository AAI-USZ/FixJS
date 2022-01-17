function() {
    if ( !$scope.newTodo.length ) {
      return;
    }

    todos.push({
      title: $scope.newTodo,
      completed: false
    });

    $scope.newTodo = '';
  }