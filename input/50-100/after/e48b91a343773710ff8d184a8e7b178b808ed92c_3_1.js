function(extraOpts) {
        var gridColumns = this.getGridColumns();
        var gridOpts = Ext.apply({
            multiSelect: true,
            autoScroll: true,
            store: this.loader.store,
            columns: gridColumns
        });
        if(extraOpts) {
            Ext.apply(gridOpts, extraOpts);
        }
        return Ext.widget('grid', gridOpts);
    }