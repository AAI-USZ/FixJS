function (data, event) {
            var newTodo = new Todo(self.current());
            self.todos.push(newTodo);
            self.current("");
        }