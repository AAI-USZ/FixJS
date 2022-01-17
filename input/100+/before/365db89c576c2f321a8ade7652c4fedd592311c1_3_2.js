function(records, op) {
        Ext.getBody().unmask();
        if(!op.success) {
            this._handleComError('Save settings', op);
            return;
        }

        var settingsindex = this.periodapplicationkeyvalue_store.findExact('key', 'settings');
        if(settingsindex > -1) {
            this.settingsRecord = records[settingsindex];
            this.settings = Ext.JSON.decode(this.settingsRecord.get('value'));
            this.chooseplugin.selectByPath(this.settings.path);
        } else {
            this.settingsRecord = Ext.create('devilry.apps.administrator.simplified.SimplifiedPeriodApplicationKeyValue', {
                period: this.loader.periodid,
                application: this.applicationid,
                key: 'settings',
                value: null
            });
        }

        var readyForExportIndex = this.periodapplicationkeyvalue_store.findExact('key', 'ready-for-export');
        if(readyForExportIndex > -1) {
            this.readyForExportRecord = records[readyForExportIndex];
        } else {
            this.readyForExportRecord = Ext.create('devilry.apps.administrator.simplified.SimplifiedPeriodApplicationKeyValue', {
                period: this.loader.periodid,
                application: this.applicationid,
                key: 'ready-for-export',
                value: null
            });
        }
    }