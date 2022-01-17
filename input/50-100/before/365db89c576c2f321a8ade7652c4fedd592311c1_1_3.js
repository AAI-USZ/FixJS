function() {
        Ext.getBody().unmask();
        if(this._minimalDatasetLoaded) {
            this._mergeCompleteDatasetIntoStore();
        } else {
            this.addListener('minimalDatasetLoaded', this._mergeCompleteDatasetIntoStore, this, {single: true});
        }
    }