function() {
        var grid = this.createGrid();
        this._detailsPanel = Ext.widget('panel', {
            title: 'Select a student to view their details',
            region: 'south',
            autoScroll: true,
            layout: 'fit',
            height: 200,
            collapsed: true,
            collapsible: true
        });
        this.add({
            xtype: 'container',
            layout: 'border',
            items: [grid, this._detailsPanel]
        });
        this.up('statistics-dataview').on('selectStudent', this._onSelectStudent, this);
    }