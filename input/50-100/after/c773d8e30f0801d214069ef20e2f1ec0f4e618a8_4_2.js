function() {
            var view = this.views.list = this.views.list || new Todo.View.TodoList;
            view.collection.fetch({
               success: function() {
                   view.render();
                }
            });
        }