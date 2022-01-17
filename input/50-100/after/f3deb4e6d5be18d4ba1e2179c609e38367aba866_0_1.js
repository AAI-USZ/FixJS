function() {
        this.control({
            'taskField': {
                keyup: this.onTaskFieldKeyup
            },
            'taskList': {
                todoChecked: this.onTodoChecked,
                itemdblclick: this.onTodoDblClicked,
                onTaskEditKeyup: this.onTaskEditKeyup,
                todoRemoveSelected: this.onTodoRemoveSelected
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