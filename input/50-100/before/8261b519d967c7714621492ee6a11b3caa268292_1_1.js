function() {
        this._loadMaskBox = Ext.widget('box', {
            tpl: '<strong>{msg}...</strong>',
            data: {msg: 'Loading'},
            listeners: {
                scope: this,
                afterrender: this._onAfterRender
            }
        });
        Ext.apply(this, {
            //style: 'background-color: transparent',
            items: [this._loadMaskBox],
            frame: false,
            border: false
        });
        this.callParent(arguments);
        this._loadStudents();
    }