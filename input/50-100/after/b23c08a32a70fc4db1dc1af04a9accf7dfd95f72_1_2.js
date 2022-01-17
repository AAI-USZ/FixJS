function() {
        this._mask('Rendering table of all results. May take some time for many students.', 'page-load-mask');
        this._minimalDatasetLoaded = true;
        this._createStore();
        this.store.suspendEvents();
        this._mergeMinimalDatasetIntoStore();
        this.store.resumeEvents();
        this._unmask();

        this.fireEvent('minimalDatasetLoaded', this);
    }