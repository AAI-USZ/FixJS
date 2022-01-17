function() {
        var me = this;
        this.prettyFormatItemTplCompiled = Ext.create('Ext.XTemplate', this.prettyFormatItemTpl);

        Ext.apply(this, {
            frame: false,
            border: 0,
            layout: 'fit',
            items: [{
                xtype: 'grid',
                hideHeaders: this.hideHeaders,
                multiSelect: true,
                store: this.store,
                columns: this.columns,
                listeners: {
                    scope: this,
                    selectionchange: this._onGridSelectionChange
                }
            }]
        });

        var tbar = [];
        if(this.includeRemove) {
            tbar.push({
                xtype: 'button',
                cls: 'selectAllButton',
                text: gettext('Select all'),
                listeners: {
                    scope: this,
                    click: this._onSelectAll
                }
            });
            tbar.push({
                xtype: 'button',
                text: gettext('Remove'),
                itemId: 'removeButton',
                cls: 'removeButton',
                disabled: true,
                listeners: {
                    scope: this,
                    click: this._onRemoveItemsClicked
                }
            });
        }
        if(this.filterFunction) {
            tbar.push({
                xtype: 'textfield',
                cls: 'filterfield',
                emptyText: gettext('Filter ...'),
                listeners: {
                    scope: this,
                    change: this._onFilterChange
                }
            });
        }
        if(tbar.length > 0) {
            this.tbar = tbar;
        }

        this.callParent(arguments);
    }