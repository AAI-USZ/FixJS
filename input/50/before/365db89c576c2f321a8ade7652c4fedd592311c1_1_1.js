function() {
        Ext.getBody().mask('Loading all data about all students on the period', 'page-load-mask');
        this._loadPeriod();
    }