function(field, event) {
        var ENTER_KEY_CODE = 13;
        var value = field.getValue().trim();
        if (event.keyCode === ENTER_KEY_CODE && value !== '') {
            var store = this.getTasksStore();
            store.add({label: value, checked: false});
            field.reset();
            store.sync();
        }
    }