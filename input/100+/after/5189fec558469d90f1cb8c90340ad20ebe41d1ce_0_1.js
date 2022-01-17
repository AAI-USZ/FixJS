function () {
        var list     = Y.one(listSelector),
            todo     = list.get('lastChild'),
            numItems = list.get('children').size();

        Assert.isTrue(list.contains(todo), 'Todo is not a child of the list.');

        todo.one('.todo-remove').simulate('click');
        numItems -= 1;

        Assert.isFalse(list.contains(todo), 'Todo node was not removed form its parentNode.');
        Assert.areSame(numItems, list.get('children').size(), 'Todo was not removed from the list.');
    }