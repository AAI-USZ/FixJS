function(callback, scope, args) {
        if(this._completeDatasetStatus.loaded) {
            //console.log('Already loaded complete', this);
            Ext.bind(callback, scope, args)();
        } else {
            //console.log('Load the complete set', this);
            this.addListener('completeDatasetLoaded', function() {
                Ext.bind(callback, scope, args)();
            }, this, {single: true});
            this._mask('Loading all results for all students', 'page-load-mask');
            this._loadAllGroupsInPeriod();
        }
    }