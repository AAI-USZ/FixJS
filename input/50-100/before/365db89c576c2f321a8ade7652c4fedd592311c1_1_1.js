function() {
        Ext.getBody().mask('Rendering table of all results. May take some time for many students.', 'page-load-mask');
        this._minimalDatasetLoaded = true;
        this._createStore();
        this.store.suspendEvents();
        this._mergeMinimalDatasetIntoStore();
        this.store.resumeEvents();
        Ext.getBody().unmask();

        this.store.fireEvent('datachanged');
        this.fireEvent('minimalDatasetLoaded', this);
    }