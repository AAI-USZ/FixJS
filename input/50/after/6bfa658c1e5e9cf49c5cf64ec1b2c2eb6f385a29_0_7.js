function () {
            return ko.utils.arrayFilter(self.todos(),
                function (todo) {
                    return todo.done();
                }).length;
        }