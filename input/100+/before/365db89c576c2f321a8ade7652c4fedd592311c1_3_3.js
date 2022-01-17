function(path, settings, callback, scope) {
        Ext.getBody().mask('Saving current settings', 'page-load-mask');
        var settingData = {
            path: path,
            settings: settings
        }
        this.settingsRecord.set('value', Ext.JSON.encode(settingData));
        this.settingsRecord.save({
            scope: this,
            callback: function(record, op) {
                Ext.getBody().unmask();
                if(!op.success) {
                    this._handleComError('Save settings', op);
                    return;
                }
                this.settings = settingData;
                this._saveReadyForExportRecord(callback, scope);
            }
        });
    }