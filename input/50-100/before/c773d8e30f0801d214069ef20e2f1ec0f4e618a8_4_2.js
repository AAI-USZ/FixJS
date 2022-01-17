function() {
            var view = new Todo.View.TodoList;
            view.collection.fetch({
               success: function() {
                   view.render();
                }
            });
        }