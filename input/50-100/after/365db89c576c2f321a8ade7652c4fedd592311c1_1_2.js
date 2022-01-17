function(callback, scope, args) {
        if(this._completeDatasetLoaded) {
            Ext.bind(callback, scope, args)();
        } else {
            this.addListener('completeDatasetLoaded', function() {
                Ext.bind(callback, scope, args)();
            }, this, {single: true});
            this._mask('Loading all results for all students', 'page-load-mask');
            this._loadAllGroupsInPeriod();
        }
    }