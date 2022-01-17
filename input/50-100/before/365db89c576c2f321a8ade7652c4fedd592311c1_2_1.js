function() {
        Ext.getBody().mask("Loading page", 'page-load-mask');
        Ext.create('devilry.statistics.Loader', this.periodid, {
            listeners: {
                scope: this,
                minimalDatasetLoaded: this._onMinimalDatasetLoaded
            }
        });
    }