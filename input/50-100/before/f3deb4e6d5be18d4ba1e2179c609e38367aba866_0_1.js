function() {
        this.control({
            'taskField': {
                keyup: this.onTaskFieldKeyup
            },
            'taskList': {
                todoChecked: this.onTodoChecked,
                itemdblclick: this.onTodoDblClicked
            },
            'completeButton': {
                click: this.onClearButtonClick
            },
            'checkAllBox': {
                click: this.onCheckAllClick
            }
        });

        this.getTasksStore().on({
            scope: this,
            update: this.onStoreDataChanged,
            datachanged: this.onStoreDataChanged
        });
    }