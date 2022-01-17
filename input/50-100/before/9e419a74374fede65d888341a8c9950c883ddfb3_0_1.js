function (listId) {
        var textField = $('input', this);
        var list = $('div.list', this);
        $(list).addClass('myListId' + listId);

        // Add empty cells.
        ensureTasksNumber(list[0]);

        // Setup typing handler.
        textField.bind('keypress', function (e) {
            if (e.keyCode == 13 && textField.val() != '') {
                addTask(textField.val(), list);
                textField.val('');
            }
        });
    }