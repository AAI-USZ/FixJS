function (record) {
        var store = this.getTasksStore();
        store.remove(record);
        store.sync();
    }