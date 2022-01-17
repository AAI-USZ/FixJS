function (todos) {
        var self = this;
        //map array of passed in todos to an observableArray of Todo objects
        self.todos = ko.observableArray(ko.utils.arrayMap(todos, function (todo) {
            return new Todo(todo.content, todo.done);
        }));

        //store the new todo value being entered
        self.current = ko.observable();

        //add a new todo, when enter key is pressed
        self.add = function (data, event) {
            var newTodo, current = (self.current() || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
            if (current) {
                newTodo = new Todo(current);
                self.todos.push(newTodo);
                self.current("");
            }
        };

        //remove a single todo
        self.remove = function (todo) {
            self.todos.remove(todo);
        };

        //remove all completed todos
        self.removeCompleted = function () {
            self.todos.remove(function (todo) {
                return todo.done();
            });
        };

        //count of all completed todos
        self.completedCount = ko.computed(function () {
            return ko.utils.arrayFilter(self.todos(),
                function (todo) {
                    return todo.done();
                }).length;
        });

        //count of todos that are not complete
        self.remainingCount = ko.computed(function () {
            return self.todos().length - self.completedCount();
        });

        //writeable computed observable to handle marking all complete/incomplete
        self.allCompleted = ko.computed({
            //always return true/false based on the done flag of all todos
            read:function () {
                return !self.remainingCount();
            },
            //set all todos to the written value (true/false)
            write:function (newValue) {
                ko.utils.arrayForEach(self.todos(), function (todo) {
                    //set even if value is the same, as subscribers are not notified in that case
                    todo.done(newValue);
                });
            }
        });

        //helper function to keep expressions out of markup
        self.getLabel = function (count) {
            return ko.utils.unwrapObservable(count) === 1 ? "item" : "items";
        };

        //internal computed observable that fires whenever anything changes in our todos
        ko.computed(
            function () {
                //get a clean copy of the todos, which also creates a dependency on the observableArray and all observables in each item
                var todos = ko.toJS(self.todos);

                //store to local storage
                amplify.store("todos-knockout", todos);
            }).extend({ throttle:1000 }); //save at most once per second
    }