function(callback, scope) {
        Ext.getBody().mask('Marking as ready for export', 'page-load-mask');
        this.readyForExportRecord.set('value', Ext.JSON.encode({
            isready: 'yes',
            savetime: devilry.extjshelpers.DateTime.restfulNow()
        }));
        this.readyForExportRecord.save({
            scope: this,
            callback: function(record, op) {
                Ext.getBody().unmask();
                if(!op.success) {
                    this._handleComError('Mark ready for export', op);
                    return;
                }
                Ext.bind(callback, scope)();
            }
        });
    }