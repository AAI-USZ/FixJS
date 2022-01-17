function() {
        this._isLoaded = false;
        Ext.apply(this, {
            items: [],
            frame: false,
            border: false
        });
        this.on('afterrender', this._onAfterRender, this);
        this.callParent(arguments);
    }