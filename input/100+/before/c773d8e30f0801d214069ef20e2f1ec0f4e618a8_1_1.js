function(callback, id) {
            var model, view;

            model = new Todo.Model.Todo({ id: id });
            view = new Todo.View.TodoEdit({ model: model });

            callback(model, view);

            view.on('back', function() {
                delete view;
                this.navigate('#/todo')
            }.bind(this));
            view.model.on('save-success', function() {
                delete view;
                this.navigate('#/todo');
            }.bind(this));
        }