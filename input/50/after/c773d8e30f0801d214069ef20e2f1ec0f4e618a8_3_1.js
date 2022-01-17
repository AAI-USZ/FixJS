function() {
            $(this.el).html(Twig.render(Todo.Template.TodoList, {
                todos: this.collection.sort().toJSON()
            }));
        }