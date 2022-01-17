function() {
        if(this._completeDatasetLoaded) {
            return;
        }
        this._completeDatasetLoaded = true;
        Ext.getBody().mask('Calculating table of all results. May take some time for many students.', 'page-load-mask');

        this.store.suspendEvents();
        this._addAssignmentsToStore();
        this._addGroupsToStore();
        this.updateScaledPoints();
        this.store.resumeEvents();

        this.store.fireEvent('datachanged');
        this.fireEvent('completeDatasetLoaded', this);

        Ext.getBody().unmask();
    }