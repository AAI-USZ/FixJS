function() {
        Ext.apply(this, {
            style: 'background-color: transparent',
            items: []
        });
        this.callParent(arguments);
        this._loadStudents();
    }