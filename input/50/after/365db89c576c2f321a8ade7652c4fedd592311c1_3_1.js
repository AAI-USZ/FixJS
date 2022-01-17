function(record, op) {
                this._unmask();
                if(!op.success) {
                    this._handleComError('Mark ready for export', op);
                    return;
                }
                Ext.bind(callback, scope)();
            }