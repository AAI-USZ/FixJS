function(value) {
        return {
            xtype : 'toolbar',
            defaultType : 'button',
            items : value,
            dock : 'bottom',
            layout : Ext.applyIf(toolbar.layout || {}, {
                // default to 'end' (right-aligned)
                pack : 'end'
            })
        }
    }