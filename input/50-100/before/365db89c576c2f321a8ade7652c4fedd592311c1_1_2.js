function(callback, scope, args) {
        if(this._completeDatasetLoaded) {
            Ext.bind(callback, scope, args)();
        } else {
            this.addListener('completeDatasetLoaded', function() {
                Ext.bind(callback, scope, args)();
            }, this, {single: true});
            Ext.getBody().mask('Loading all results for all students', 'page-load-mask');
            this._loadAllGroupsInPeriod();
        }
    }