function(extraOpts) {
        var gridColumns = this.getGridColumns();
        this.loader.on('filterCleared', this._onFilterChange, this);
        this.loader.on('filterApplied', this._onFilterChange, this);
        var gridOpts = Ext.apply({
            multiSelect: true,
            autoScroll: true,
            store: this.loader.store,
            columns: gridColumns,
            bbar: ['->', {
                xtype: 'tbtext',
                text: this._getTbText()
            }]
        });
        if(extraOpts) {
            Ext.apply(gridOpts, extraOpts);
        }
        return Ext.widget('grid', gridOpts);
    }