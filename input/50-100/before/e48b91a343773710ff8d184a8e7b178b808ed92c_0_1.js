function() {
        Ext.getBody().mask('Rendering table of all results. May take some time for many students.', 'page-load-mask');

        this.store.suspendEvents();
        this._addAssignmentsToStore();
        this._addGroupsToStore();
        this.updateScaledPoints();
        this.store.resumeEvents();

        this._completeDatasetLoaded = true;
        this.store.fireEvent('datachanged');
        this.fireEvent('completeDatasetLoaded', this);

        Ext.getBody().unmask();
    }