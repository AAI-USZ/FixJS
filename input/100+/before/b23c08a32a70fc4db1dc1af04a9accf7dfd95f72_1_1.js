function(periodid, config) {
        this._students_by_releatedid = {};
        this.periodid = periodid;
        this.labelManager = Ext.create('devilry.statistics.LabelManager', {
            loader: this
            //listeners: {
                //scope: this,
                //changedMany: this._onDataChanged
            //}
        });

        this.assignment_store = Ext.create('Ext.data.Store', {
            model: 'devilry.apps.administrator.simplified.SimplifiedAssignment',
            remoteFilter: true,
            remoteSort: true
        });
        this.assignment_ids = [];

        this.addEvents('completeDatasetLoaded', 'minimalDatasetLoaded', 'filterApplied', 'filterCleared');
        // Copy configured listeners into *this* object so that the base class's
        // constructor will add them.
        this.listeners = config.listeners;

        this.callParent(arguments);
        this._loadMinimalDataset();
    }