function() {
        var gridColumns = this.getGridColumns();
        return Ext.widget('grid', {
            region: 'center',
            multiSelect: true,
            autoScroll: true,
            store: this.loader.store,
            columns: gridColumns,
            listeners: {
                scope: this,
                select: function(grid, record) {
                    this.up('statistics-dataview').fireEvent('selectStudent', record);
                }
            }
        });
    }