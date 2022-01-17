function() {
        if(this._completeDatasetStatus.loaded) {
            return;
        }
        this._completeDatasetStatus.loaded = true;
        this._mask('Calculating table of all results. May take some time for many students.', 'page-load-mask');

        this.store.suspendEvents();
        this._addAssignmentsToStore();
        this._addGroupsToStore();
        this.updateScaledPoints();
        this.store.resumeEvents();

        this.fireEvent('completeDatasetLoaded', this);

        this._unmask();
    }