function (data, event) {
            var newTodo, current = (self.current() || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
            if (current) {
                newTodo = new Todo(current);
                self.todos.push(newTodo);
                self.current("");
            }
        }