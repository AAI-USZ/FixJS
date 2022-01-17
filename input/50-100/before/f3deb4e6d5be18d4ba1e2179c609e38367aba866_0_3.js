function() {
        var records = [],
            store = this.getTasksStore();

        store.each(function(record) {
            if (record.get('checked')) {
                records.push(record);
            }
        });
        store.remove(records);
        store.sync();
    }