function() {
        this.store.suspendEvents(); // without suspendEvents/resumeEvents, each record change fires an update event, which makes updateScaledPoints take forever for huge datasets.
        Ext.each(this.store.data.items, function(studentRecord, index) {
            studentRecord.updateScaledPoints();
        }, this);
        this.store.resumeEvents();
    }